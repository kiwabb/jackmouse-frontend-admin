/*
调用接口结构： 调用接口-- services/system/api : User 、updateUser、addUser、removeUser
具体接口地址：config/proxy
类型data结构校验：services/system/typing: UserListItem、UserList
*/

import { addUser, removeUser, user } from '@/services/system/User/api';
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
// import type {FormValueType} from './components/UpdateForm';
// import UpdateForm from './components/UpdateForm';
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

  const handleConfirmDelete = () => {
    setConfirmLoading(true);
    removeUser(currentRow?.id);
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
      await updateUser({ fields });
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
      tip: 'The User name is the unique key',
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
      title: (
        <FormattedMessage id="pages.searchTable.system.user.nickname" defaultMessage="nickname" />
      ),
      dataIndex: 'nickname',
      sorter: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.user.avatar" defaultMessage="avatar" />,
      dataIndex: 'avatar',
      sorter: true,
      hideInForm: false,
      render: (dom, entity) => {
        return !errors[entity.id] ? (
          <Avatar
            src={dom}
            alt={entity.nickname?.charAt(0)}
            onError={() => handleOnError(entity.id)}
          />
        ) : (
          <Avatar style={{ backgroundColor: '#87d068' }}>{entity.nickname?.charAt(0)}</Avatar>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.user.phone" defaultMessage="phone" />,
      dataIndex: 'phone',
      sorter: true,
      hideInForm: true,
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
      hideInForm: true,
      valueEnum: {
        0: {
          text: <FormattedMessage id="pages.searchTable.system.user.sex.boy" defaultMessage="男" />,
          status: '男',
        },
        1: {
          text: (
            <FormattedMessage id="pages.searchTable.system.user.sex.girl" defaultMessage="女" />
          ),
          status: '女',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.user.enable" defaultMessage="状态" />,
      dataIndex: 'enabled',
      sorter: true,
      hideInForm: true,
      valueEnum: {
        0: {
          text: <FormattedMessage id="pages.searchTable.system.user.able" defaultMessage="正常" />,
          status: '正常',
        },
        1: {
          text: (
            <FormattedMessage id="pages.searchTable.system.user.unable" defaultMessage="禁用" />
          ),
          status: '禁用',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.user.type" defaultMessage="类型" />,
      dataIndex: 'type',
      sorter: true,
      hideInForm: true,
      valueEnum: {
        1: {
          text: (
            <FormattedMessage id="pages.searchTable.system.user.type1" defaultMessage="类型1" />
          ),
          status: '类型1',
        },
        2: {
          text: (
            <FormattedMessage id="pages.searchTable.system.user.type2" defaultMessage="类型2" />
          ),
          status: '类型2',
        },
        3: {
          text: (
            <FormattedMessage id="pages.searchTable.system.user.type3" defaultMessage="类型3" />
          ),
          status: '类型3',
        },
      },
    },

    //行末 操作，编辑和删除
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        // 编辑
        <a
          key={record.id}
          onClick={() => {
            setCurrentRow(record);
            handleConfirmEdit(record);
            console.log(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.edit" defaultMessage="edit" />
        </a>,
        <Popconfirm
          onConfirm={handleConfirmDelete}
          // onCancel={() => setOpen(false)}
          key={record.id}
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
            defaultMessage: 'Enquiry form',
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
            tooltip="最长为 24 位"
            placeholder="请输入名称"
          />

          <ProFormText width="md" name="nickname" label="昵称" placeholder="请输入昵称" />
          {/*新增时 头像默认 后续用户修改*/}
          {/*<ProFormText width="md" name="avatar" label="头像" placeholder="请输入头像" />*/}
          <ProFormText width="md" name="phone" label="手机号" placeholder="请输入手机号" />
          <ProFormText width="md" name="email" label="邮箱" placeholder="请输入邮箱" />
          <ProFormSelect
            width="md"
            options={[
              {
                value: '0',
                label: '男',
              },
              {
                value: '1',
                label: '女',
              },
            ]}
            name="sex"
            label="性别"
          />
          <ProFormSelect
            width="md"
            options={[
              {
                value: '0',
                label: '正常',
              },
              {
                value: '1',
                label: '禁用',
              },
            ]}
            name="enabled"
            label="状态"
          />

          <ProFormSelect
            width="md"
            options={[
              {
                value: '1',
                label: '类型1',
              },
              {
                value: '2',
                label: '类型2',
              },
              {
                value: '3',
                label: '类型3',
              },
            ]}
            name="type"
            label="类型"
          />
        </ModalForm>

        {/*---------编辑信息--------*/}

        <ModalForm
          title={intl.formatMessage({
            id: 'pages.searchTable.createForm.updateUser',
            defaultMessage: 'New User',
          })}
          width="400px"
          open={updateModalOpen}
          onOpenChange={handleUpdateModalOpen}
          modalProps={{
            destroyOnClose: true,
          }}
          initialValues={currentRow}
          onFinish={async (record) => {
            await handleSave(record as API.UserListItem);
          }}
        >
          <ProFormText
            width="md"
            name="username"
            label="用户名称"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
            disabled
          />

          <ProFormText width="md" name="nickname" label="昵称" placeholder="请输入昵称" />
          {/*<ProFormText width="md" name="avatar" label="头像" placeholder="请输入头像" />*/}
          <ProFormText width="md" name="phone" label="手机号" placeholder="请输入手机号" />
          <ProFormText width="md" name="email" label="邮箱" placeholder="请输入邮箱" />
          <ProFormSelect
            width="md"
            options={[
              {
                value: 0,
                label: '男',
              },
              {
                value: 1,
                label: '女',
              },
            ]}
            name="sex"
            label="性别"
          />
          <ProFormSelect
            width="md"
            options={[
              {
                value: 0,
                label: '正常',
              },
              {
                value: 1,
                label: '禁用',
              },
            ]}
            name="enabled"
            label="状态"
          />

          <ProFormSelect
            width="md"
            options={[
              {
                value: '1',
                label: '类型1',
              },
              {
                value: '2',
                label: '类型2',
              },
              {
                value: '3',
                label: '类型3',
              },
            ]}
            name="type"
            label="类型"
          />
        </ModalForm>

        {/*--------修改更新------------*/}
        {/*<UpdateForm*/}
        {/*  onSubmit={async (value) => {*/}
        {/*    const success = await handleUpdate(value);*/}
        {/*    if (success) {*/}
        {/*      handleUpdateModalOpen(false);*/}
        {/*      setCurrentRow(undefined);*/}
        {/*      if (actionRef.current) {*/}
        {/*        await actionRef.current.reload();*/}
        {/*      }*/}
        {/*    }*/}
        {/*  }}*/}
        {/*  onCancel={() => {*/}
        {/*    handleUpdateModalOpen(false);*/}
        {/*    if (!showDetail) {*/}
        {/*      setCurrentRow(undefined);*/}
        {/*    }*/}
        {/*  }}*/}
        {/*  updateModalOpen={updateModalOpen}*/}
        {/*  values={currentRow || {}}*/}
        {/*/>*/}

        <Drawer
          width={600}
          open={showDetail}
          onClose={() => {
            setCurrentRow(undefined);
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
