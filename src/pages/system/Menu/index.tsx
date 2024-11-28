import { addRule, removeRule, updateRule } from '@/services/ant-design-pro/api';
import { FolderOpenOutlined, MenuOutlined, PlusOutlined, ProfileOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message, Popconfirm, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { menu } from '@/services/system/Menu/api';
import { treeify } from '@/utils/treeify';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.SysMenu[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [keyword, _setKeyword] = useState<string>();
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [data, setData] = useState<API.SysMenu[]>();
  const [keys, setKeys] = useState<React.Key[]>([]);
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.SysMenu>();
  const [selectedRowsState, setSelectedRows] = useState<API.SysMenu[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.SysMenu>[] = [
    {
      title: <FormattedMessage id="pages.searchTable.system.menu.name" defaultMessage="菜单名称" />,
      dataIndex: 'name',
      // 设置单元格属性
      onCell: (entity) => ({
        className: keyword && entity.name?.includes(keyword) ? 'highlight' : '',
      }),
      render: (dom, entity) => {
        if (entity.type === 1) {
          if (entity.url?.startsWith('javascript')) {
            return (
              <Space size={'small'}>
                <FolderOpenOutlined />
                {entity.name}
              </Space>
            );
          } else {
            return (
              <Space size={'small'}>
                <MenuOutlined />
                {entity.name}
              </Space>
            );
          }
        } else {
          return (
            <Space size={'small'}>
              <ProfileOutlined />
              {entity.name}
            </Space>
          );
        }
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.menu.url" defaultMessage="菜单url" />,
      dataIndex: 'url',
      onCell: (entity) => ({
        className: keyword && entity.url?.includes(keyword) ? 'highlight' : '',
      }),
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.menu.path" defaultMessage="菜单path" />,
      dataIndex: 'path',
      ellipsis: true,
      onCell: (entity) => ({
        className: keyword && entity.path?.includes(keyword) ? 'highlight' : '',
      }),
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.menu.css" defaultMessage="样式" />,
      dataIndex: 'css',
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.menu.sort" defaultMessage="排序" />,
      dataIndex: 'sort',
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.menu.sort" defaultMessage="排序" />,
      dataIndex: 'type',
      render: (_dom, entity) => {
        if (entity.type === 1) {
          if (entity.url?.startsWith('javascript')) {
            return <Tag color="green">目录</Tag>;
          } else {
            return <Tag color="blue">菜单</Tag>;
          }
        } else {
          return <Tag color="cyan">资源</Tag>;
        }
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, entity) => [
        <a
          key="edit"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(entity);
          }}
        >
          <FormattedMessage id="pages.searchTable.edit" defaultMessage="编辑" />
        </a>,
        <Popconfirm
          key={entity.id}
          title={`确认删除菜单[${entity.name}]?`}
          onConfirm={async () => {
            const success = await handleRemove([entity]);
            if (success) {
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        >
          <a key={'delete'}>
            <FormattedMessage id="pages.searchTable.edit" defaultMessage="删除" />
          </a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer header={{ subTitle: '维护系统菜单' }}>
      <ProTable<API.SysMenu, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.system.menu',
          defaultMessage: '菜单管理',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <>
            <Button
              onClick={() => {
                setExpandedRowKeys(keys);
              }}
            >
              全部展开
            </Button>
            <Button
              onClick={() => {
                setExpandedRowKeys([]);
              }}
            >
              全部折叠
            </Button>
            <Button type="primary" onClick={() => {}}>
              <PlusOutlined /> 添加
            </Button>
          </>,
        ]}
        request={async (params) => {
          const menus = await menu(params);
          console.log('menus', menus);
          const treeData = treeify(menus, {});
          treeData.forEach((node) => {
            if (node.children && node.children.length === 0) delete node.children;
          });
          setKeys(menus.map((node) => node.id));
          setData(treeData);
        }}
        dataSource={data}
        columns={columns}
        pagination={false}
        expandable={{
          expandedRowKeys,
          onExpandedRowsChange: (expandedRows) => setExpandedRowKeys([...expandedRows]),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.id!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          let data = { ...value, username: 'kiwa' };
          const success = await handleAdd(data as API.RuleListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>

      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
