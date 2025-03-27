import { PageContainer, ProColumns, ProTable, ProCard } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { getTransactionFilter, getTranslationDetail } from '@/services/ims/transaction/api';
import { useState } from 'react';
import { Drawer } from 'antd';
// import { message} from "antd";

const TableList: React.FC = () => {
  const intl = useIntl();
  const [DrawerOpen, setDrawerOpen] = useState(false);
  const [CurrentDetail, setCurrentDetail] = useState<API.transactionDetail>({});

  // const handleTransactionFilter=async(search?: string, options?: { [key: string]: any })=>{
  //
  //   try {
  //     // console()
  //     await getTransactionFilter(search,options);
  //
  //     message.success("获取成功");
  //   } catch (error) {
  //     console.error('Error fetching transaction filter:', error);
  //     message.error(`获取失败`);
  //   }
  // };

  const columns: ProColumns<API.transactionItem>[] = [
    {
      title: (
        <FormattedMessage id="pages.searchTable.system.transactions.status" defaultMessage="状态" />
      ),
      // search: false,
      //接口字段名
      dataIndex: 'status',
      key: 'filter',
      valueEnum: {
        COMPLETED: '完成',
      },
      // search: false,
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.system.transactions.transactionType"
          defaultMessage="交易类型"
        />
      ),
      // search: false,
      //接口字段名
      dataIndex: 'transactionType',
      valueType: 'select',
      valueEnum: {
        SALE: '销售',
        PURCHASE: '采购',
      },

      // search: false,
    },

    {
      title: (
        <FormattedMessage
          id="pages.searchTable.system.transactions.totalPrice"
          defaultMessage="总数量"
        />
      ),
      // search: false,
      //接口字段名
      dataIndex: 'totalProducts',
      tip: '产品是独一无二的',
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.system.transactions.totalPrice"
          defaultMessage="总价格"
        />
      ),
      // search: false,
      //接口字段名
      dataIndex: 'totalPrice',
      tip: '产品是独一无二的',
    },
    // {
    //   title: (
    //     <FormattedMessage
    //       id="pages.searchTable.system.transactions.category"
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

    // {
    //   title: '产品类别',
    //   dataIndex: 'categoryId',
    //   valueType: 'select', // 指定为下拉框
    //   fieldProps: {
    //     showSearch: true, // 支持搜索
    //     placeholder: '类别',
    //   },
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
    // },

    {
      title: (
        <FormattedMessage
          id="pages.searchTable.system.transactions.description"
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
        <FormattedMessage
          id="pages.searchTable.system.transactions.createdAt"
          defaultMessage="时间"
        />
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
        // style: { width: 400 }, // 设置查询选择框的宽度
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
            setDrawerOpen(true);
            getTranslationDetail(record.id).then((r) => {
              setCurrentDetail(r);
            });

            // handleConfirmEdit(record);
            console.log(record);
          }}
        >
          详情
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.transactionItem>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.system.transactions.transactionsLabel',
          defaultMessage: '产品类别',
        })}
        // actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={getTransactionFilter}
        columns={columns}
      />

      <Drawer
        width={640}
        open={DrawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
        closable={false}
      >
        <ProCard title="默认尺寸" bordered tooltip="这是提示" style={{ maxWidth: 300 }} boxShadow>
          {/*{"id": number,*/}
          {/*"totalProducts": number,*/}
          {/*"totalPrice": number,*/}
          {/*"transactionType": string,*/}
          {/*"status": string,*/}
          {/*"description"?: string,*/}
          {/*"note"?: string,*/}
          {/*"createdAt": string}*/}
          {/*{CurrentDetail.data?.product ? JSON.stringify(CurrentDetail.data.product, null, 2) : ''}*/}
          类型：{JSON.stringify(CurrentDetail.data?.transactionType)}
          状态：{JSON.stringify(CurrentDetail.data?.status)}
          描述：{JSON.stringify(CurrentDetail.data?.description)}
          笔记：{JSON.stringify(CurrentDetail.data?.note)}
          总产品数：{JSON.stringify(CurrentDetail.data?.totalProducts)}
          总价格：{JSON.stringify(CurrentDetail.data?.totalPrice)}
          创建时间：{JSON.stringify(CurrentDetail.data?.createdAt)}
        </ProCard>
        <ProCard boxShadow>
          产品：{JSON.stringify(CurrentDetail.data?.product?.name)}
          SKU：{JSON.stringify(CurrentDetail.data?.product?.sku)}
          价格：{JSON.stringify(CurrentDetail.data?.product?.price)}
          库存：{JSON.stringify(CurrentDetail.data?.product?.stockQuantity)}
          描述：{JSON.stringify(CurrentDetail.data?.product?.description)}
          图片：{JSON.stringify(CurrentDetail.data?.product?.imageUrl)}
        </ProCard>
        <ProCard boxShadow></ProCard>
      </Drawer>
    </PageContainer>
  );
};

// const [errors, setErrors] = useState();

export default TableList;
