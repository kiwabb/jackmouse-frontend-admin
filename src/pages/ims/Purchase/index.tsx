import { ProCard, ProFormColumnsType } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { addPurchase } from '@/services/ims/transaction/api';
import { Product } from '@/services/ims/Product/api';
import { Button, Form, message } from 'antd';
import { Supplier } from '@/services/ims/Supplier/api';

// 打开弹窗并传递当前记录

// @ts-ignore
/**
 * @en-US International configuration
 * @zh-CN 国际化配置
 * */
// const intl = useIntl();

const productSelect = async () => {
  const data = await Product();
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
const supplierSelect = async () => {
  const data = await Supplier();
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
const columns: ProFormColumnsType[] = [
  {
    title: '选择产品',
    dataIndex: 'productId',
    //initialValue: '必填',
    request: productSelect,
    valueType: 'select',
    fieldProps: { style: { height: '38px' } },

    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '选择供应商',
    dataIndex: 'supplierId',
    request: supplierSelect,
    valueType: 'select',
    fieldProps: { style: { height: '38px' } },
    //initialValue: '必填',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },

  {
    title: '入库数量',
    dataIndex: 'quantity',
    fieldProps: { style: { height: '38px' } },
    //initialValue: '必填',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '描述',
    dataIndex: 'description',
    //initialValue: '非必填',
    fieldProps: { style: { height: '38px' } },
  },
  {
    title: '备注',
    dataIndex: 'note',
    //initialValue: '非必填',
    fieldProps: { style: { height: '38px' } },
  },
];

export default () => {
  // const actionRef =useRef<any>();
  const [form] = Form.useForm();
  const handleAddPurchase = async (value: API.transactionItem) => {
    const success = await addPurchase(value);
    if (success) {
      message.success('添加成功');

      form.resetFields();
    }
  };
  return (
    <ProCard title="产品入库" extra="入库" tooltip="这是提示" style={{ maxWidth: 500 }} boxShadow>
      <BetaSchemaForm
        form={form}
        // actionRef={actionRef}
        shouldUpdate={false}
        layoutType="Form"
        onFinish={handleAddPurchase}
        columns={columns}
        style={{ width: '100%' }}
        submitter={{
          render: (props) => {
            return [
              <Button
                key="reset"
                type="default"
                htmlType="reset"
                onClick={props.reset}
                style={{
                  backgroundColor: '#ffffff',
                  borderColor: 'rgba(0,0,0,0.2)',
                  color: 'rgba(0,0,0,0.91)',
                  height: '38px',
                  marginTop: '10px',
                  display: 'block',
                  width: '100%',
                }}
              >
                重制
              </Button>,
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: '#1890ff',
                  borderColor: 'rgba(3,3,3,0.05)',
                  display: 'block',
                  height: '38px',
                  marginTop: '10px',
                  width: '100%',
                }}
              >
                提交
              </Button>,
            ];
          },
        }}
      />
    </ProCard>
  );
};
