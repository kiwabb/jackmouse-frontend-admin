import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Row, Space } from 'antd';
import {
  assignUser,
  deleteRoleUser,
  selectAssignUser,
  selectUnAssignUser,
} from '@/services/system/User/api';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { TableRowSelection } from 'antd/es/table/interface';

const AssignUser: React.FC<any> = ({ open, onOpenChange, roleId }) => {
  const [selectedUnAssignRowKeys, setSelectedUnAssignRowKeys] = useState<React.Key[]>([]);
  const [selectedAssignRowKeys, setSelectedAssignRowKeys] = useState<React.Key[]>([]);
  const actionAssignRef = useRef<ActionType>();
  const actionUnAssignRef = useRef<ActionType>();
  const [usernameLeft, setUsernameLeft] = useState<string>();
  const [usernameRight, setUsernameRight] = useState<string>();

  useEffect(() => {
    actionAssignRef.current?.reload();
    actionUnAssignRef.current?.reload();
  }, [open]);

  // 左侧主表格列
  const mainColumns: ProColumns<API.UserListItem>[] = [
    {
      title: '登录账号',
      dataIndex: 'id',
      key: 'id',
      hideInTable: true,
    },
    {
      title: '登录账号',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '员工姓名',
      dataIndex: 'nickname',
      key: 'nickname',
    },
  ];

  // 右侧子表格列
  const subColumns = [
    {
      title: '登录账号',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '员工姓名',
      dataIndex: 'nickname',
      key: 'nickname',
    },
  ];
  const onSelectUnAssignChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedUnAssignRowKeys(newSelectedRowKeys);
  };

  const onSelectAssignChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedAssignRowKeys(newSelectedRowKeys);
  };

  const rowUnAssignSelection: TableRowSelection<API.UserListItem> = {
    selectedRowKeys: selectedUnAssignRowKeys,
    onChange: onSelectUnAssignChange,
  };

  const rowAssignSelection: TableRowSelection<API.UserListItem> = {
    selectedRowKeys: selectedAssignRowKeys,
    onChange: onSelectAssignChange,
  };

  const handlerSearchUser = () => {
    actionAssignRef.current?.reload();
    actionUnAssignRef.current?.reload();
  };

  const handlerAddRoleUser = async () => {
    const hide = message.loading('正在添加');
    try {
      const result = await assignUser({ roleId, userIds: selectedUnAssignRowKeys });
      hide();
      if (result.success) {
        message.success('权限分配成功');
        return true;
      } else {
        message.error(result.errorMessage);
        return false;
      }
    } catch (error) {
      hide();
      message.error('权限分配失败！');
      return false;
    } finally {
      setSelectedAssignRowKeys([]);
      setSelectedUnAssignRowKeys([]);
      actionAssignRef.current?.reload();
      actionUnAssignRef.current?.reload();
    }
  };

  const handlerDeleteRoleUser = async () => {
    const hide = message.loading('正在删除');
    try {
      const result = await deleteRoleUser({ roleId, userIds: selectedAssignRowKeys });
      hide();
      if (result.success) {
        message.success('删除成功');
        return true;
      } else {
        message.error(result.errorMessage);
        return false;
      }
    } catch (error) {
      hide();
      message.error('删除失败！');
      return false;
    } finally {
      setSelectedAssignRowKeys([]);
      setSelectedUnAssignRowKeys([]);
      actionAssignRef.current?.reload();
      actionUnAssignRef.current?.reload();
    }
  };

  return (
    <Modal title={'分配角色'} width={1200} open={open} onCancel={() => onOpenChange(false)}>
      <Row gutter={16}>
        <Col>
          <Form.Item name="employeeName" label="用户姓名左">
            <Input
              placeholder="请输入用户姓名"
              onChange={(e) => {
                setUsernameLeft(e.target.value);
              }}
              value={usernameLeft}
            />
            <br />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="employeeName" label="用户姓名右">
            <Input
              placeholder="请输入用户姓名左"
              onChange={(e) => setUsernameRight(e.target.value)}
              value={usernameRight} // 绑定左侧状态
              allowClear
            />
            <br />
          </Form.Item>
        </Col>
        <Col>
          <Button type="primary" onClick={handlerSearchUser}>
            查询
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => {
              console.log(123);
              setUsernameLeft('');
              setUsernameRight('');
            }}
          >
            重置
          </Button>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={11}>
          <ProTable
            actionRef={actionUnAssignRef}
            rowKey={'id'}
            search={false}
            columns={mainColumns}
            request={async (params) => {
              if (usernameLeft) {
                params.nickname = usernameLeft;
              }
              params.roleId = roleId;
              return selectUnAssignUser(params);
            }}
            rowSelection={rowUnAssignSelection}
          ></ProTable>
        </Col>
        <Col span={2} style={{ textAlign: 'center' }}>
          <Space
            direction="vertical"
            size="large"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Button type="primary" onClick={handlerAddRoleUser}>
              新增 →
            </Button>
            <Button danger onClick={handlerDeleteRoleUser}>
              删除
            </Button>
          </Space>
        </Col>
        <Col span={11}>
          <ProTable
            actionRef={actionAssignRef}
            search={false}
            columns={subColumns}
            rowKey="id"
            rowSelection={rowAssignSelection}
            request={async (params) => {
              if (open && roleId) {
                if (usernameRight) {
                  params.nickname = usernameRight;
                }
                params.roleId = roleId;
                return selectAssignUser(params);
              }
              return {};
            }}
          />
        </Col>
      </Row>
    </Modal>
  );
};
export default AssignUser;
