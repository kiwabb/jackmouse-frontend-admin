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
import { addCategory, category } from '@/services/system/Category/api';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [openNewCategory, setOpenNewCategory] = useState<boolean>(false);
  const handleAddCategory = async (file: API.CategoryListItem) => {
    const hide = message.loading('正在添加');
    try {
      await addCategory(file);
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
  const intl = useIntl();
  const columns: ProColumns<API.CategoryListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.system.category.categoryName"
          defaultMessage="类别名称"
        />
      ),
      search: false,
      //接口字段名
      dataIndex: 'name',
      tip: '产品类别是独一无二的',
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
        width="md"
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('关闭弹窗'),
        }}
        onFinish={async (record) => {
          console.log(record);
          const success = await handleAddCategory(record);
          if (success) {
            setOpenNewCategory(false);
            if (actionRef.current) {
              await actionRef.current.reload(); // 刷新数据表格
            }
          }
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
