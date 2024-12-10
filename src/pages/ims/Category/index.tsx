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
import { addCategory, category, deleteCategory, updateCategory } from '@/services/ims/Category/api';
import { Button, Form, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [openNewCategory, setOpenNewCategory] = useState<boolean>(false);
  const handleAddCategory = async (file: API.CategoryListItem) => {
    const hide = message.loading('正在添加');
    try {
      await addCategory(file);
      hide();
      message.success('添加成功');
      // return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      // return false;
    }
    actionRef.current?.reloadAndRest?.();
  };
  const [current, setCurrent] = useState<API.CategoryListItem>({ id: 0, name: '' });
  const [loading, setLoading] = useState(false);
  const [OpenEditcategory, setOpenEditcategory] = useState<boolean>(false);
  const handleCategoryDelete = async () => {
    const hide = message.loading('正在删除');
    try {
      await deleteCategory(current.id);
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
  const [form] = Form.useForm();
  const handleCategoryOpen = (record: API.CategoryListItem) => {
    form.setFieldsValue(record);
    setOpenEditcategory(true);
  };

  const columns: ProColumns<API.CategoryListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.system.category.categoryName"
          defaultMessage="类别名称"
        />
      ),
      // search: false,
      //接口字段名
      dataIndex: 'name',
      tip: '产品类别是独一无二的',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key={record.id}
          onClick={() => {
            setCurrent(record);
            handleCategoryOpen(record);

            setOpenEditcategory(true);
          }}
        >
          <FormattedMessage id="pages.searchTable.edit" defaultMessage="edit" />
        </a>,
        <Popconfirm
          onConfirm={handleCategoryDelete} // 包裹为箭头函数
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
              setCurrent(record);
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
      <ProTable<API.CategoryListItem>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.system.category.categoryLabel',
          defaultMessage: '产品类别',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => setOpenNewCategory(true)}>
            <PlusOutlined />
            <FormattedMessage id="pages.searchTable.newCategory" defaultMessage="New" />
          </Button>,
        ]}
        request={category}
        columns={columns}
      />

      {/*新增*/}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.updateUser',
          defaultMessage: '新增类别',
        })}
        open={openNewCategory}
        onOpenChange={setOpenNewCategory}
        width="400px"
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('关闭弹窗'),
        }}
        onFinish={async (record: API.CategoryListItem) => {
          console.log(record);
          await handleAddCategory(record);
          // 方法一：
          // try{
          //   await handleAddCategory(record);
          //   message.success("新增成功")
          // }catch(error){
          //   message.error("error")
          // }
          // setOpenNewCategory(false)
          // actionRef.current?.reloadAndRest?.();
          // 方法二
          // const success = await handleAddCategory(record);
          // if (success) {
          //   setOpenNewCategory(false);
          //   if (actionRef.current) {
          //     await actionRef.current.reload(); // 刷新数据表格
          //   }
          // }
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="类别名称"
          tooltip="最长为 24 位"
          placeholder="请输入类别"
        />
      </ModalForm>

      {/*编辑*/}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm',
          defaultMessage: '新增',
        })}
        form={form}
        open={OpenEditcategory}
        onOpenChange={setOpenEditcategory}
        width="400px"
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('关闭弹窗'),
        }}
        onFinish={async (record: API.CategoryListItem) => {
          console.log(record);
          try {
            await updateCategory(current.id, record);
            message.success('修改成功');
          } catch (error) {
            message.error('error');
          }
          setOpenEditcategory(false);
          actionRef.current?.reloadAndRest?.(); // 刷新数据表格
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="类别名称"
          tooltip="最长为 24 位"
          placeholder="请输入类别"
        />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
