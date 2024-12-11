import React, { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from '@umijs/max';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
  ProTable,
} from '@ant-design/pro-components';
import { addProduct, Product, deleteProduct, updateProduct } from '@/services/ims/Product/api';
import { Avatar, Button, Form, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { category } from '@/services/ims/Category/api';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [openNewProduct, setOpenNewProduct] = useState<boolean>(false);
  const handleAddProduct = async (file: API.ProductListItem) => {
    const hide = message.loading('正在添加');
    try {
      await addProduct(file);
      hide();
      message.success('添加成功');
      setOpenNewProduct(false);
      // return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      // return false;
    }
    actionRef.current?.reloadAndRest?.();
  };
  const [current, setCurrent] = useState<API.ProductListItem>({
    categoryId: 0,
    createdAt: '',
    description: '',
    id: 0,
    imageUrl: [],
    name: '',
    price: 0,
    productId: 0,
    sku: '',
    stockQuantity: 0,
  });
  const [loading, setLoading] = useState(false);
  const [OpenEditProduct, setOpenEditProduct] = useState<boolean>(false);
  const handleProductDelete = async () => {
    const hide = message.loading('正在删除');
    try {
      await deleteProduct(current.id);
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

  const intl = useIntl();
  const [form] = Form.useForm();
  const handleProductOpen = (record: API.ProductListItem) => {
    form.setFieldsValue(record);
    setOpenEditProduct(true);
  };
  //
  // const selectAfter = (
  //   <Select defaultValue="USD" style={{ width: 60 }}>
  //     <Option value="USD">$</Option>
  //     <Option value="EUR">€</Option>
  //     <Option value="GBP">£</Option>
  //     <Option value="CNY">¥</Option>
  //   </Select>
  // );

  const categorySelect = async () => {
    const data = await category();
    let result: { label: string; value: number }[] = [];
    // return data.map((item) => ({ label: item.name, value: item.id }));
    data.data?.forEach((e) => {
      result.push({
        label: e.name!,
        value: e.id,
      });
    });
    return result;
  };

  const columns: ProColumns<API.ProductListItem>[] = [
    {
      title: (
        <FormattedMessage id="pages.searchTable.system.Product.imageUrl" defaultMessage="图片" />
      ),
      // search: false,
      //接口字段名
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (dom, entity: API.ProductListItem) => (
        <Avatar src={entity.imageUrl} alt={entity.name} />
      ),
      search: false,
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.system.Product.ProductName" defaultMessage="产品" />
      ),
      // search: false,
      //接口字段名
      dataIndex: 'name',
      tip: '产品是独一无二的',
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.Product.SKU" defaultMessage="SKU" />,
      // search: false,
      //接口字段名
      dataIndex: 'sku',
      tip: '产品SKU是独一无二的',
    },
    {
      title: <FormattedMessage id="pages.searchTable.system.Product.price" defaultMessage="价格" />,
      // search: false,
      //接口字段名
      dataIndex: 'price',
      tip: '产品SKU是独一无二的',
    },

    {
      title: (
        <FormattedMessage
          id="pages.searchTable.system.Product.stockQuantity"
          defaultMessage="库存"
        />
      ),
      // search: false,
      //接口字段名
      dataIndex: 'stockQuantity',
      tip: '产品是独一无二的',
    },
    // {
    //   title: (
    //     <FormattedMessage
    //       id="pages.searchTable.system.Product.category"
    //       defaultMessage="分类"
    //     />
    //   ),
    //   // search: false,
    //   //接口字段名
    //   dataIndex: 'category',
    //   tip: '产品SKU是独一无二的',
    //
    //
    // },

    {
      title: '产品类别',
      dataIndex: 'categoryId',
      valueType: 'select', // 指定为下拉框
      request: categorySelect, // 动态加载下拉选项
      fieldProps: {
        showSearch: true, // 支持搜索
        placeholder: '请选择类别',
      },
      //render: (_, record) => record.categoryName, // 渲染列数据

      //search:{transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),},
      //列表头筛选filterDropdown
      // filterDropdown: () => (
      //   <ProFormSelect
      //     name="categoryId" // 对应字段名，需与 dataIndex 匹配
      //     placeholder="请选择类别"
      //     request={categorySelect} // 动态加载选项
      //     showSearch // 支持搜索
      //     width="sm" // 控制宽度
      //   />
      // ),
    },

    {
      title: (
        <FormattedMessage
          id="pages.searchTable.system.Product.description"
          defaultMessage="产品描述"
        />
      ),
      // search: false,
      //接口字段名
      dataIndex: 'description',
      tip: '产品是独一无二的',
    },

    {
      title: (
        <FormattedMessage id="pages.searchTable.system.Product.createdAt" defaultMessage="时间" />
      ),
      // render: (value, entity) => {
      //   return <span>{entity.createdAt}</span>;
      // },
      // search: false,
      //接口字段名
      dataIndex: 'createdAt',
      tip: '时间',
      // dataFormatter: 'yyyy-MM-dd',
      valueType: 'dateTime',
      hideInSearch: true,
      fieldProps: {},
    },
    {
      title: '时间范围',
      key: 'dateTimeRangeCustom',
      dataIndex: 'dateTimeRange',
      //table隐藏列 hideInTable
      hideInTable: true,
      //查询框隐藏
      // search:false,

      valueType: 'dateTimeRange',
      fieldProps: {
        style: { width: 400 }, // 设置查询选择框的宽度
        // placeholder: ['1', '2']
      },
      renderFormItem: (_, { type, defaultRender }) => {
        if (type === 'form') {
          return null;
        }
        return defaultRender(_);
      },
    },

    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key={record.id}
          onClick={() => {
            // categoryAll()
            setCurrent(record);
            handleProductOpen(record);
            setOpenEditProduct(true);
          }}
        >
          <FormattedMessage id="pages.searchTable.edit" defaultMessage="edit" />
        </a>,
        <Popconfirm
          onConfirm={handleProductDelete} // 包裹为箭头函数
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
      <ProTable<API.ProductListItem>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.system.Product.ProductLabel',
          defaultMessage: '产品类别',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => setOpenNewProduct(true)}>
            <PlusOutlined />
            <FormattedMessage id="pages.searchTable.newProduct" defaultMessage="New" />
          </Button>,
        ]}
        request={Product}
        columns={columns}
      />

      {/*新增*/}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.updateUser',
          defaultMessage: '新增类别',
        })}
        open={openNewProduct}
        onOpenChange={setOpenNewProduct}
        width="400px"
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('关闭弹窗'),
        }}
        onFinish={async (record: API.ProductListItem) => {
          console.log(record);
          await handleAddProduct(record);
          // 方法一：
          // try{
          //   await handleAddProduct(record);
          //   message.success("新增成功")
          // }catch(error){
          //   message.error("error")
          // }
          // setOpenNewProduct(false)
          // actionRef.current?.reloadAndRest?.();
          // 方法二
          // const success = await handleAddProduct(record);
          // if (success) {
          //   setOpenNewProduct(false);
          //   if (actionRef.current) {
          //     await actionRef.current.reload(); // 刷新数据表格
          //   }
          // }
        }}
      >
        <ProFormText
          // width="md"
          name="name"
          label="产品名称"
          tooltip="最长为 24 位"
          placeholder="请输入产品名"
          fieldProps={{
            showCount: true,
            maxLength: 20,
          }}
          rules={[{ required: true, message: '请输入产品名称!' }]}
        />

        <ProFormText
          // width="md"
          name="sku"
          label="产品sku"
          tooltip="最长为 24 位"
          placeholder="请输入产品sku"
          fieldProps={{
            showCount: true,
            maxLength: 20,
          }}
          rules={[
            { required: true, message: '产品SKU是必填项，请输入产品SKU' }, // 必填校验规则
          ]}
        />

        <ProFormDigit
          // width="md"
          name="price"
          label="产品价格-RMB"
          tooltip="最长为 24 位"
          placeholder="请输入产品价格"
          fieldProps={{
            min: 1,
            max: 100000,
            prefix: '￥',
            // addonAfter:{selectAfter},
            style: { width: '50%' },
          }}
          rules={[
            { required: true, message: '产品价格是必填项，请输入产品价格' }, // 必填校验规则
          ]}
        />
        <ProFormDigit
          name="stockQuantity"
          label="库存"
          placeholder="请输入库存"
          fieldProps={{
            // 数字最大值，最小值
            // changeOnWheel,
            min: 1,
            max: 10,
            style: { width: '50%' },
          }}
          rules={[
            { required: true, message: '库存是必填项，请输入库存数量' }, // 必填校验规则
          ]}
        />

        {/*下拉框选择产品类别 request={categorySelect}*/}
        <ProFormSelect
          // width="md"
          name="categoryId"
          label="分类"
          tooltip="选择分类"
          placeholder="请选择分类"
          request={categorySelect}
          rules={[
            { required: true, message: '分类是必填项，请输入分类' }, // 必填校验规则
          ]}
        />

        <ProFormTextArea
          // width="md"
          name="description"
          label="描述"
          // tooltip="最长为 24 位"
          placeholder="请输入产品描述"
          fieldProps={{
            autoSize: true,
          }}
        />

        <ProFormUploadDragger max={4} label="照片" name="imageUrl" />
      </ModalForm>

      {/*编辑*/}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.editForm',
          defaultMessage: '编辑',
        })}
        form={form}
        open={OpenEditProduct}
        onOpenChange={setOpenEditProduct}
        width="400px"
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('关闭弹窗'),
        }}
        onFinish={async (record: API.ProductListItem) => {
          try {
            await updateProduct(current.id, record);
            message.success('修改成功');
          } catch (error) {
            message.error('error');
          }
          setOpenEditProduct(false);
          actionRef.current?.reloadAndRest?.(); // 刷新数据表格
        }}
      >
        <ProFormText
          // width="md"
          name="name"
          label="产品名称"
          tooltip="最长为 24 位"
          placeholder="请输入产品名"
          fieldProps={{
            showCount: true,
            maxLength: 20,
          }}
        />
        <ProFormText
          // width="md"
          name="sku"
          label="产品sku"
          tooltip="最长为 24 位"
          placeholder="请输入产品sku"
        />
        <ProFormText
          // width="md"
          name="price"
          label="产品价格"
          tooltip="最长为 24 位"
          placeholder="请输入产品价格"
        />
        <ProFormText
          // width="md"
          name="stockQuantity"
          label="库存"
          tooltip="最长为 24 位"
          placeholder="请输入库存"
        />
        <ProFormSelect
          // width="md"
          name="categoryId"
          label="分类"
          tooltip="选择分类"
          placeholder="请选择分类"
          request={categorySelect}
        />
        <ProFormUploadDragger max={4} label="照片" name="imageUrl" />
      </ModalForm>
    </PageContainer>
  );
};

// const [errors, setErrors] = useState();

export default TableList;
