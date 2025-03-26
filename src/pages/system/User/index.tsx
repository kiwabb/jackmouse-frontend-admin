/*
调用接口结构： 调用接口-- services/system/api : User 、updateUser、addUser、removeUser
具体接口地址：config/proxy
类型data结构校验：services/system/typing: UserListItem、UserList
*/

import { addUser, getDetails, removeUser, user } from '@/services/system/User/api';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ProColumns,
  ProDescriptionsItemProps,
  ProFormSelect,
} from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { App, Avatar, Button, Drawer, Form, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';

import { updateUser } from '@/services/system/User/api';
//import { removeRule } from '@/services/ant-design-pro/api';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.UserListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addUser({ ...fields });
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
// const handleUpdate = async (fields: FormValueType) => {
//   const hide = message.loading('Configuring');
//   try {
//     await updateUser({
//       username: fields.username,
//       nickname: fields.nickname,
//       phone: fields.phone,
//       sex: fields.sex,
//       avatar: fields.avatar,
//       email: fields.email,
//     });
//     hide();
//
//     message.success('Configuration is successful');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Configuration failed, please try again!');
//     return false;
//   }
// };

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
// const handleRemove = async (selectedRows: API.UserListItem[]) => {
//   const hide = message.loading('正在删除');
//   if (!selectedRows) return true;
//   try {
//     await removeRule({
//       key: selectedRows.map((row) => row.id),
//     });
//     hide();
//     message.success('Deleted successfully and will refresh soon');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Delete failed, please try again');
//     return false;
//   }
// };

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: number]: boolean }>({});
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UserListItem>();
  //const [selectedRowsState, setSelectedRows] = useState<API.UserListItem[]>([]);
  const [form] = Form.useForm();

  const [confirmLoading, setConfirmLoading] = useState(false);
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const handleConfirmDelete = async () => {
    setConfirmLoading(true);
    await removeUser(currentRow?.id);
    // setOpen(false);
    setConfirmLoading(false);
    actionRef.current?.reloadAndRest?.();
  };

  // 打开弹窗并传递当前记录
  const handleConfirmEdit = (record: API.UserListItem) => {
    form.setFieldsValue(record); // 设置表单初始值
    handleUpdateModalOpen(true);
    console.log(record);
  };

  // 保存修改
  const handleSave = async (fields: API.UserListItem) => {
    try {
      await updateUser({ ...currentRow, ...fields });
      message.success('修改成功');
      handleUpdateModalOpen(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
    actionRef.current?.reloadAndRest?.();
    console.log(currentRow);
    console.log(fields);
  };

  const handleOnError = (id: number) => {
    setErrors((prevErrors) => ({ ...prevErrors, [id]: true }));
    return true;
  };

  const columns: ProColumns<API.UserListItem>[] = [
    {
      // 列名称
      title: (
        <FormattedMessage id="pages.searchTable.system.user.username" defaultMessage="user name" />
      ),

      //tooltip: 'user name',//会在 title 之后展示一个 icon，hover 之后提示一些信息
      //ellipsis: false,//	是否自动缩略
      dataIndex: 'username',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.user.avatar" defaultMessage="avatar" />,
      dataIndex: 'avatar',
      sorter: true,
      hideInSearch: true,
      hideInForm: false,
      render: (dom, entity) => {
        const entityId = entity.id!;
        return !errors[entityId] ? (
          <Avatar
            src={dom}
            alt={entity.nickname?.charAt(0)}
            onError={() => handleOnError(entityId)}
          />
        ) : (
          <Avatar style={{ backgroundColor: '#87d068' }}>{entity.nickname?.charAt(0)}</Avatar>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.user.phone" defaultMessage="phone" />,
      dataIndex: 'mobile',
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.user.email" defaultMessage="email" />,
      dataIndex: 'email',
      sorter: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.user.sex" defaultMessage="sex" />,
      dataIndex: 'sex',
      sorter: true,
      hideInSearch: true,
      hideInForm: true,
      valueEnum: {
        MALE: {
          text: <FormattedMessage id="pages.searchTable.system.user.sex.boy" defaultMessage="男" />,
          status: '男',
        },
        FEMALE: {
          text: (
            <FormattedMessage id="pages.searchTable.system.user.sex.girl" defaultMessage="女" />
          ),
          status: '女',
        },
        UNKNOWN: {
          text: (
            <FormattedMessage
              id="pages.searchTable.system.user.sex.unknown"
              defaultMessage="未知"
            />
          ),
          status: '未知',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.user.status" defaultMessage="状态" />,
      dataIndex: 'status',
      sorter: true,
      hideInForm: true,
      valueEnum: {
        NORMAL: {
          text: (
            <FormattedMessage
              id="pages.searchTable.system.user.status.normal"
              defaultMessage="正常"
            />
          ),
          status: '正常',
        },
      },
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.system.user.userType" defaultMessage="用户类型" />
      ),
      dataIndex: 'userType',
      sorter: true,
      hideInForm: true,
      valueEnum: {
        SUPER_ADMIN: {
          text: (
            <FormattedMessage
              id="pages.searchTable.system.user.userType.superAdmin"
              defaultMessage="超级管理员"
            />
          ),
          status: '超级管理员',
        },
        ADMIN: {
          text: (
            <FormattedMessage
              id="pages.searchTable.system.user.userType.admin"
              defaultMessage="管理员"
            />
          ),
          status: '管理员',
        },
        USER: {
          text: (
            <FormattedMessage
              id="pages.searchTable.system.user.userType.user"
              defaultMessage="普通用户"
            />
          ),
          status: '普通用户',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.createdAt" defaultMessage={'创建时间'} />,
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      width: 160,
      hideInSearch: true,
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.updatedAt" defaultMessage={'修改时间'} />,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      width: 160,
      hideInSearch: true,
      sorter: true,
    },
    //行末 操作，编辑和删除
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        // 编辑
        <a
          key={'edit' + record.id}
          onClick={() => {
            getDetails(record.id).then((res) => {
              setCurrentRow(res);
              handleConfirmEdit(record);
            });
          }}
        >
          <FormattedMessage id="pages.searchTable.edit" defaultMessage="edit" />
        </a>,
        <Popconfirm
          onConfirm={handleConfirmDelete}
          // onCancel={() => setOpen(false)}
          key={'delete' + record.id}
          placement="topLeft"
          title={'删除'}
          // open={open}
          description={'是否删除'}
          okText="是"
          cancelText="否"
          okButtonProps={{ loading: confirmLoading }}
        >
          <a
            key="id"
            onClick={() => {
              setCurrentRow(record);
              // setOpen(true);
            }}
          >
            <FormattedMessage id="pages.searchTable.deletion" defaultMessage="deletion" />
          </a>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <App>
      <PageContainer>
        <ProTable<API.UserListItem, API.PageParams>
          headerTitle={intl.formatMessage({
            id: 'pages.searchTable.title',
            defaultMessage: '查询表格',
          })}
          actionRef={actionRef}
          rowKey="key"
          search={{
            labelWidth: 80,
          }} //查询框
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalOpen(true);
              }}
            >
              <PlusOutlined />
              {/*新建*/}
              <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
            </Button>,
          ]} //工具栏渲染
          request={user}
          columns={columns}
          // rowSelection={{
          //   onChange: (_, selectedRows) => {
          //     setSelectedRows(selectedRows);
          //   },
          // }}
        />
        {/*-----新增弹窗---------*/}
        <ModalForm
          title={intl.formatMessage({
            id: 'pages.searchTable.createForm.newUser',
            defaultMessage: 'New User',
          })}
          width="400px"
          open={createModalOpen}
          onOpenChange={handleModalOpen}
          modalProps={{
            destroyOnClose: true,
            onCancel: () => console.log('run'),
          }}
          onFinish={async (record) => {
            const success = await handleAdd(record as API.UserListItem);
            if (success) {
              handleModalOpen(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        >
          <ProFormText
            width="md"
            name="username"
            label="用户名称"
            rules={[{ required: true, max: 24 }]}
            placeholder="请输入名称"
          />
          {/*<ProFormText width="md" name="avatar" label="头像" placeholder="请输入头像" />*/}
          <ProFormText
            width="md"
            name="mobile"
            label="手机号"
            placeholder="请输入手机号"
            rules={[{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }]}
          />
          <ProFormText
            width="md"
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            rules={[{ type: 'email' }]}
          />
          <ProFormSelect
            width="md"
            options={[
              {
                value: 'MALE',
                label: '男',
              },
              {
                value: 'FEMALE',
                label: '女',
              },
              {
                value: 'UNKNOWN',
                label: '未知',
              },
            ]}
            name="sex"
            label="性别"
          />

          <ProFormSelect
            width="md"
            options={[
              {
                value: 'ADMIN',
                label: '管理员',
              },
              {
                value: 'NORMAL',
                label: '用户',
              },
            ]}
            name="userType"
            label="用户类型"
          />
        </ModalForm>

        {/*---------编辑信息--------*/}

        <ModalForm
          title={intl.formatMessage({
            id: 'pages.searchTable.createForm.updateUser',
            defaultMessage: 'New User',
          })}
          initialValues={currentRow}
          width="400px"
          open={updateModalOpen}
          onOpenChange={handleUpdateModalOpen}
          modalProps={{
            destroyOnClose: true,
          }}
          form={form}
          onFinish={async (record: API.UserListItem) => {
            console.log(record);
            await handleSave(record);
          }}
        >
          <ProFormText
            width="md"
            name="username"
            label="用户名称"
            rules={[{ required: true, max: 24 }]}
            placeholder="请输入名称"
          />

          {/*<ProFormText width="md" name="avatar" label="头像" placeholder="请输入头像" />*/}
          <ProFormText
            width="md"
            name="mobile"
            label="手机号"
            placeholder="请输入手机号"
            rules={[{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }]}
          />
          <ProFormText
            width="md"
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            rules={[{ type: 'email' }]}
          />
          <ProFormSelect
            width="md"
            options={[
              {
                value: 'MALE',
                label: '男',
              },
              {
                value: 'FEMALE',
                label: '女',
              },
              {
                value: 'UNKNOWN',
                label: '未知',
              },
            ]}
            name="sex"
            label="性别"
          />

          <ProFormSelect
            width="md"
            options={[
              {
                value: 'ADMIN',
                label: '管理员',
              },
              {
                value: 'NORMAL',
                label: '用户',
              },
            ]}
            name="userType"
            label="用户类型"
          />
        </ModalForm>

        <Drawer
          width={600}
          open={showDetail}
          onClose={() => {
            // setCurrentRow(undefined);
            setShowDetail(false);
          }}
          closable={false}
        >
          {currentRow?.username && (
            <ProDescriptions<API.UserListItem>
              column={2}
              title={currentRow?.username}
              request={async () => ({
                data: currentRow || {},
              })}
              params={{
                id: currentRow?.username,
              }}
              columns={columns as ProDescriptionsItemProps<API.UserListItem>[]}
            />
          )}
        </Drawer>
      </PageContainer>
    </App>
  );
};
export default TableList;
