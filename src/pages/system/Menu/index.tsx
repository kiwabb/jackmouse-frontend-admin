import { FolderOpenOutlined, MenuOutlined, PlusOutlined, ProfileOutlined } from '@ant-design/icons';
import {
  ActionType,
  ProColumns,
  ProDescriptionsItemProps,
  ProFormDigit,
  ProFormRadio,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message, Popconfirm, Space, Switch, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateForm from './components/UpdateForm';
import {
  addMenu,
  menu,
  menuById,
  menuTypeOne,
  removeMenu,
  updateMenu,
} from '@/services/system/Menu/api';
import { treeify } from '@/utils/treeify';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.SysMenu) => {
  const hide = message.loading('正在添加');
  try {
    await addMenu({ ...fields });
    hide();
    message.success('添加成功！');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败！');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.SysMenu) => {
  const hide = message.loading('Configuring');
  try {
    await updateMenu(fields);
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param entity
 */
const handleRemove = async (entity: API.SysMenu) => {
  const hide = message.loading('正在删除');
  if (!entity) return true;
  try {
    await removeMenu(entity.id);
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

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.SysMenu>[] = [
    {
      title: <FormattedMessage id="pages.searchTable.system.menu.name" defaultMessage="菜单名称" />,
      dataIndex: 'name',
      width: 180,
      // 设置单元格属性
      onCell: (entity) => ({
        className: keyword && entity.name?.includes(keyword) ? 'highlight' : '',
      }),
      render: (dom, entity) => {
        if (entity.url?.startsWith('javascript')) {
          return (
            <Space size={'small'}>
              <FolderOpenOutlined />
              {entity.name}
            </Space>
          );
        } else if (entity.type === 1) {
          return (
            <Space size={'small'}>
              <MenuOutlined />
              {entity.name}
            </Space>
          );
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
      title: <FormattedMessage id="pages.searchTable.system.menu.path" defaultMessage="路由地址" />,
      dataIndex: 'path',
      ellipsis: true,
      onCell: (entity) => ({
        className: keyword && entity.path?.includes(keyword) ? 'highlight' : '',
      }),
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.system.menu.componentName"
          defaultMessage="组件名称"
        />
      ),
      dataIndex: 'componentName',
      ellipsis: true,
      onCell: (entity) => ({
        className: keyword && entity.path?.includes(keyword) ? 'highlight' : '',
      }),
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.system.menu.component" defaultMessage="组件地址" />
      ),
      dataIndex: 'component',
      ellipsis: true,
      onCell: (entity) => ({
        className: keyword && entity.path?.includes(keyword) ? 'highlight' : '',
      }),
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.menu.icon" defaultMessage="图标" />,
      dataIndex: 'icon',
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.menu.sort" defaultMessage="排序" />,
      dataIndex: 'sort',
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.menu.sort" defaultMessage="类型" />,
      dataIndex: 'type',
      render: (_dom, entity) => {
        if (entity.path?.startsWith('http')) {
          return <Tag color="blue">资源</Tag>;
        } else if (entity.type === 1) {
          return <Tag color="green">目录</Tag>;
        } else {
          return <Tag color="cyan">菜单</Tag>;
        }
      },
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.system.menu.hidden" defaultMessage="是否隐藏" />
      ),
      dataIndex: 'hidden',
      render: (_dom, entity) => {
        return (
          <Switch
            checked={entity.hidden}
            checkedChildren={'隐藏'}
            unCheckedChildren={'显示'}
            onChange={(checked) => {
              entity.hidden = checked;
              handleUpdate(entity).then(() => {
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              });
            }}
          />
        );
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
            menuById(entity.id).then((res) => {
              setCurrentRow(res);
            });
          }}
        >
          <FormattedMessage id="pages.searchTable.edit" defaultMessage="编辑" />
        </a>,
        <Popconfirm
          key={entity.id}
          title={`确认删除菜单[${entity.name}]?`}
          onConfirm={async () => {
            const success = await handleRemove(entity);
            if (success) {
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        >
          <a key={'delete'}>
            <FormattedMessage id="pages.searchTable.删除" defaultMessage="删除" />
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
            <Button
              type="primary"
              onClick={() => {
                handleModalOpen(true);
              }}
            >
              <PlusOutlined /> 添加
            </Button>
          </>,
        ]}
        request={async (params) => {
          const menus = await menu(params);
          const treeData = treeify(menus, {});
          menus.forEach((node) => {
            if (node.children && node.children.length === 0) delete node.children;
          });
          setKeys(menus.map((node) => node.id));
          return {
            data: treeData,
            success: true,
          };
        }}
        columns={columns}
        pagination={false}
        expandable={{
          expandedRowKeys,
          onExpandedRowsChange: (expandedRows) => setExpandedRowKeys([...expandedRows]),
        }}
      />

      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newMenu',
          defaultMessage: '新建规则',
        })}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        modalProps={{
          destroyOnClose: true,
          okText: '保存',
        }}
        onFinish={async (value) => {
          let data = { ...value };
          const success = await handleAdd(data as API.SysMenu);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormTreeSelect
          label={'上级菜单'}
          name={'parentId'}
          width={'md'}
          request={async () => {
            // 查询菜单类型的数据
            const menus = await menuTypeOne();
            if (menus) {
              const a = menus.map((item) => {
                return { ...item, key: item.id, title: item.name, value: item.id };
              });
              const treeData: any = treeify(a, {});
              const root = {
                title: '顶级目录',
                value: -1,
                key: -1,
              };
              treeData.unshift(root);
              console.log('treeData', treeData);
              return treeData;
            }
            return [];
          }}
          fieldProps={{
            fieldNames: {
              label: 'title',
            },
            placeholder: '请选择上级菜单',
          }}
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '菜单名称不能为空',
            },
          ]}
          width={'md'}
          name={'name'}
          label={'菜单名称'}
          placeholder={'请输入菜单名称'}
        />
        <ProFormText width="md" name="component" label="组件地址" placeholder="输入组件地址" />
        <ProFormText width="md" name="componentName" label="组件名称" placeholder="输入组件名称" />
        <ProFormText width="md" name="path" label="路由地址" placeholder="输入路由地址" />
        <ProFormText
          rules={[
            {
              required: true,
              message: '菜单图标不为空',
            },
          ]}
          width="md"
          name="icon"
          label="菜单图标"
          placeholder="输入菜单图标"
        />
        <ProFormTextArea width="md" name="desc" />
        <ProFormRadio.Group
          name="hidden"
          label="是否隐藏"
          width="lg"
          initialValue={false}
          options={[
            {
              label: '否',
              value: false,
            },
            {
              label: '是',
              value: true,
            },
          ]}
          rules={[{ required: true, message: '选择是否隐藏' }]}
        />
        <ProFormRadio.Group
          name="type"
          label="是否为菜单"
          width="lg"
          initialValue={1}
          options={[
            {
              label: '是',
              value: 1,
            },
            {
              label: '否',
              value: 2,
            },
          ]}
          rules={[{ required: true, message: '选择是否为菜单' }]}
        />
        <ProFormDigit
          label="排序号"
          name="sort"
          width="md"
          min={1}
          fieldProps={{ precision: 0 }}
          rules={[{ required: true, message: '选择排序号' }]}
        />
      </ModalForm>

      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate({ ...currentRow, ...value });
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
        onOpenChange={handleUpdateModalOpen}
        updateModalOpen={updateModalOpen}
        values={currentRow}
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
