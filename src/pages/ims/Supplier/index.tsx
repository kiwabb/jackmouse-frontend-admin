import React, { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from '@umijs/max';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import {
  addSupplier,
  deleteSupplier,
  oneSupplier,
  Supplier,
  updateSupplier,
} from '@/services/ims/Supplier/api';
import { Button, Form, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [openNewSupplier, setOpenNewSupplier] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.SupplierListItem>({
    address: '',
    contactInfo: '',
    id: 0,
    name: '',
  });
  const [openEditSupplier, setOpenEditSupplier] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  // 打开弹窗并传递当前记录
  const handleSupplierOpen = (record: API.SupplierListItem) => {
    form.setFieldsValue(record); // 设置表单初始值
    setOpenEditSupplier(true);
    console.log(record);
  };

  const handleAddSupplier = async (file: API.SupplierListItem) => {
    const hide = message.loading('正在添加');
    try {
      await addSupplier(file);
      hide();
      message.success('Added successfully');
      // return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      // return false;
    }
    actionRef.current?.reloadAndRest?.();
  };

  const handleSupplierEdit = async (record: API.SupplierListItem) => {
    try {
      await updateSupplier(currentRow.id, record);
      message.success('修改成功');
      setOpenEditSupplier(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
    actionRef.current?.reloadAndRest?.();
    console.log(currentRow);
    console.log(record);
  };

  //删除
  const handleSupplierDelete = async () => {
    const hide = message.loading('正在删除');

    try {
      await deleteSupplier(currentRow.id);
      setLoading(true);
      hide();
      message.success('deleted successfully');
      setLoading(false);
    } catch (error) {
      setLoading(true);
      hide();
      message.error('deleting failed, please try again!');
      setLoading(false);
    }
    actionRef.current?.reloadAndRest?.();
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();
  const columns: ProColumns<API.SupplierListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.system.Supplier.SupplierName"
          defaultMessage="供应商名称"
        />
      ),

      //接口字段名
      dataIndex: 'name',
      tip: '供应商是独一无二的',
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.system.Supplier.ContactInfo"
          defaultMessage="联系方式"
        />
      ),

      //接口字段名
      dataIndex: 'contactInfo',
      tip: '供应商是独一无二的',
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.system.Supplier.Address" defaultMessage="地址" />
      ),

      //接口字段名
      dataIndex: 'address',
      tip: '供应商是独一无二的',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key={record.id}
          onClick={() => {
            oneSupplier(record.id).then((res) => {
              setCurrentRow(res);
              handleSupplierOpen(res);
            });
            setOpenEditSupplier(true);
          }}
        >
          <FormattedMessage id="pages.searchTable.edit" defaultMessage="edit" />
        </a>,
        <Popconfirm
          onConfirm={handleSupplierDelete} // 包裹为箭头函数
          // onCancel={() => setOpen(false)}
          key={record.id}
          placement="topLeft"
          title={'删除'}
          // open={open}
          description={'是否删除'}
          okText="是"
          cancelText="否"
          okButtonProps={{ loading: loading }}
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
    <PageContainer>
      <ProTable<API.SupplierListItem>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.system.Supplier.SupplierLabel',
          defaultMessage: '供应商',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => setOpenNewSupplier(true)}>
            <PlusOutlined />
            <FormattedMessage id="pages.searchTable.newSupplier" defaultMessage="New" />
          </Button>,
        ]}
        request={Supplier}
        columns={columns}
      />

      {/*新增*/}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.updateSupplier',
          defaultMessage: '新增供应商',
        })}
        open={openNewSupplier}
        onOpenChange={setOpenNewSupplier}
        width="400px"
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('关闭弹窗'),
        }}
        onFinish={async (record: API.SupplierListItem) => {
          console.log(record);
          // const success = await
          await handleAddSupplier(record);
          // if (success) {
          //   setOpenNewSupplier(false);
          //   if (actionRef.current) {
          //     await actionRef.current.reload(); // 刷新数据表格
          //   }
          // }
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="供应商名称"
          tooltip="最长为 24 位"
          placeholder="请输入供应商名称"
        />
        <ProFormText
          width="md"
          name="contactInfo"
          label="联系方式"
          tooltip="最长为 24 位"
          placeholder="请输入联系方式"
        />
        <ProFormText
          width="md"
          name="address"
          label="地址"
          tooltip="最长为 24 位"
          placeholder="请输入地址"
        />
      </ModalForm>

      {/*编辑*/}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.updateSupplier',
          defaultMessage: '编辑供应商',
        })}
        open={openEditSupplier}
        form={form}
        onOpenChange={setOpenEditSupplier}
        width="400px"
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('关闭弹窗'),
        }}
        onFinish={async (record: API.SupplierListItem) => {
          console.log(record);
          await handleSupplierEdit(record);
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="供应商名称"
          tooltip="最长为 24 位"
          placeholder="请输入供应商名称"
        />
        <ProFormText
          width="md"
          name="contactInfo"
          label="联系方式"
          tooltip="最长为 24 位"
          placeholder="请输入联系方式"
        />
        <ProFormText
          width="md"
          name="address"
          label="地址"
          tooltip="最长为 24 位"
          placeholder="请输入地址"
        />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
