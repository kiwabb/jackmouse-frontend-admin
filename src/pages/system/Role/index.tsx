import React, { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from '@umijs/max';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Form, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addRole, deleteRole, oneRole, role, updateRole } from '@/services/system/Role/api';
import AssignMenu from '@/pages/system/Role/components/AssignMenu';
import AssignUser from '@/pages/system/Role/components/AssignUser';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [openNewRole, setOpenNewRole] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.SysRoleItem>();
  const [openEditRole, setOpenEditRole] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [menuRoleId, setMenuRoleId] = useState<number>();
  const [userRoleId, setUserRoleId] = useState<number>();

  const [assignMenu, setAssignMenu] = useState<boolean>(false);
  const [assignUser, setAssignUser] = useState<boolean>(false);

  const handleAddRole = async (file: API.SysRoleItem) => {
    const hide = message.loading('正在添加');
    try {
      await addRole(file);
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
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  // 打开弹窗并传递当前记录
  const handleRoleOpen = (record: API.SysRoleItem) => {
    form.setFieldsValue(record); // 设置表单初始值
    setOpenEditRole(true);
    console.log(record);
  };

  // 保存修改
  const handleRoleEdit = async (record: API.SysRoleItem) => {
    try {
      await updateRole({
        ...record,
      });
      message.success('修改成功');
      setOpenEditRole(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
    actionRef.current?.reloadAndRest?.();
    console.log(currentRow);
    console.log(record);
  };

  const handleRoleDelete = () => {
    setLoading(true);
    deleteRole(currentRow?.id);
    // setOpen(false);
    setLoading(false);
    actionRef.current?.reloadAndRest?.();
  };

  const intl = useIntl();
  const columns: ProColumns<API.SysRoleItem>[] = [
    {
      title: (
        <FormattedMessage id="pages.searchTable.system.Role.roleName" defaultMessage="角色名称" />
      ),
      //search: true,只有不需要展示的时候需要写search：false
      //接口字段名
      dataIndex: 'name',
      tip: '角色名是独一无二的',
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.system.Role.dataScope"
          defaultMessage="数据权限范围配置"
        />
      ),
      //search: true,只有不需要展示的时候需要写search：false
      //接口字段名
      dataIndex: 'dataScope',
      tip: '数据权限范围',
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.Role.code" defaultMessage="角色code" />,

      //接口字段名
      dataIndex: 'code',
      tip: '数据权限范围',
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.system.Role.enabled" defaultMessage="是否启用" />
      ),
      ////search: true,只有不需要展示的时候需要写search：false只有不需要展示的时候需要写search：false
      //接口字段名
      dataIndex: 'enabled',
      valueEnum: {
        true: {
          text: <FormattedMessage id="pages.searchTable.system.Role.able" defaultMessage="启用" />,
          status: '启用',
        },
        false: {
          text: (
            <FormattedMessage id="pages.searchTable.system.Role.unable" defaultMessage="禁用" />
          ),
          status: '禁用',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      key: 'option',
      render: (_, record) => [
        <a
          key={'edit-' + record.id}
          onClick={() => {
            setOpenEditRole(true);
            oneRole(record.id).then((res) => {
              setCurrentRow(res);
              handleRoleOpen(record);
            });
          }}
        >
          <FormattedMessage id="pages.searchTable.edit" defaultMessage="edit" />
        </a>,

        <Popconfirm
          onConfirm={handleRoleDelete}
          // onCancel={() => setOpen(false)}
          key={'delete-' + record.id}
          placement="topLeft"
          title={'删除'}
          // open={open}
          description={'是否删除'}
          okText="是"
          cancelText="否"
          okButtonProps={{ loading: loading }}
        >
          <a
            onClick={() => {
              setCurrentRow(record);
              // setOpen(true);
            }}
          >
            <FormattedMessage id="pages.searchTable.deletion" defaultMessage="deletion" />
          </a>
        </Popconfirm>,
        <a
          key={'assignMenu-' + record.id}
          onClick={() => {
            setMenuRoleId(record.id);
            setAssignMenu(true);
          }}
        >
          <FormattedMessage id="pages.searchTable.assignMenu" defaultMessage="分配菜单" />
        </a>,
        <a
          key={'assignUser-' + record.id}
          onClick={() => {
            setUserRoleId(record.id);
            setAssignUser(true);
          }}
        >
          <FormattedMessage id="pages.searchTable.assignUser" defaultMessage="分配角色" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.SysRoleItem>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.system.Role.roleLabel',
          defaultMessage: '角色分类',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => setOpenNewRole(true)}>
            <PlusOutlined />
            <FormattedMessage id="pages.searchTable.newRole" defaultMessage="New" />
          </Button>,
        ]}
        request={role}
        columns={columns}
      />
      {/*新增*/}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.system.newRole',
          defaultMessage: '新增角色',
        })}
        open={openNewRole}
        onOpenChange={setOpenNewRole}
        width="400px"
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('关闭弹窗'),
        }}
        onFinish={async (record) => {
          console.log(record);
          const success = await handleAddRole(record as API.SysRoleItem);
          if (success) {
            setOpenNewRole(false);
            if (actionRef.current) {
              await actionRef.current.reload(); // 刷新数据表格
            }
          }
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="角色名称"
          tooltip="最长为 24 位"
          placeholder="请输入类别"
        />
        <ProFormText
          width="md"
          name="dataScope"
          label="数据范围"
          tooltip="最长为 24 位"
          placeholder="请输入数据范围"
        />
        <ProFormText
          width="md"
          name="code"
          label="角色code"
          tooltip="最长为 24 位"
          placeholder="请输入数据范围"
        />
        <ProFormSelect
          width="md"
          name="enabled"
          label="是否可用"
          placeholder="请选择是否可用"
          options={[
            { value: true, label: '是' },
            { value: false, label: '否' },
          ]}
        />
      </ModalForm>

      {/*-----------------编辑-----------------*/}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.system.editRole',
          defaultMessage: '角色编辑',
        })}
        form={form}
        initialValues={currentRow}
        open={openEditRole}
        onOpenChange={setOpenEditRole}
        width="400px"
        modalProps={{
          destroyOnClose: true,
        }}
        onFinish={async (record: API.SysRoleItem) => {
          console.log(record);
          await handleRoleEdit(record);
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="角色名称"
          tooltip="最长为 24 位"
          placeholder="请输入角色"
          disabled
        />
        <ProFormText
          width="md"
          name="dataScope"
          label="数据范围"
          tooltip="最长为 24 位"
          placeholder="请输入数据范围"
        />
        <ProFormText
          width="md"
          name="code"
          label="角色code"
          tooltip="最长为 24 位"
          placeholder="请输入数据范围"
        />
        <ProFormSelect
          width="md"
          name="enabled"
          label="是否可用"
          placeholder="请选择是否可用"
          options={[
            { value: true, label: '是' },
            { value: false, label: '否' },
          ]}
        />
      </ModalForm>
      <AssignMenu open={assignMenu} onOpenChange={setAssignMenu} roleId={menuRoleId} />
      <AssignUser open={assignUser} onOpenChange={setAssignUser} roleId={userRoleId} />
    </PageContainer>
  );
};

export default TableList;
