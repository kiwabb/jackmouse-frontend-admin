import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Form } from 'antd';
import React, { useEffect } from 'react';
import { menuTypeOne } from '@/services/system/Menu/api';
import { treeify } from '@/utils/treeify';

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: API.SysMenu) => void;
  onSubmit: (values: API.SysMenu) => Promise<void>;
  updateModalOpen: boolean;
  values: API.SysMenu | undefined;
  onOpenChange?: (visible: boolean) => void;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { values } = props;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  return (
    <ModalForm
      title="修改菜单"
      form={form}
      // layout="horizontal"
      open={props.updateModalOpen}
      modalProps={{
        destroyOnClose: true,
      }}
      // initialValues={formData}
      onFinish={props.onSubmit}
      onOpenChange={props.onOpenChange}
      submitter={{
        searchConfig: {},
        resetButtonProps: {
          onClick: () => {
            props.onCancel();
          },
        },
      }}
    >
      <ProForm.Group>
        <ProFormTreeSelect
          label="上级菜单"
          name="parentId"
          width="md"
          request={async () => {
            const menus = await menuTypeOne();
            if (menus) {
              let a = menus.map((item) => {
                return { ...item, key: item.id, title: item.name, value: item.id };
              });
              let treeData: any = treeify(a, {});
              let root = {
                title: '顶级目录',
                value: -1,
                key: -1,
              };
              treeData.unshift(root);
              return treeData;
            }
            return [];
          }}
          fieldProps={{
            fieldNames: {
              label: 'title',
            },
            // treeCheckable: true,
            // showCheckedStrategy: TreeSelect.SHOW_PARENT,
            placeholder: '选择上级菜单名',
          }}
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '菜单名称不能为空',
            },
          ]}
          width={'md'}
          name={'name'}
          label={'菜单名称'}
          placeholder={'请输入菜单名称'}
        />
        <ProFormText width="md" name="component" label="组件地址" placeholder="输入组件地址" />
        <ProFormText width="md" name="componentName" label="组件名称" placeholder="输入组件名称" />
        <ProFormText width="md" name="path" label="路由地址" placeholder="输入路由地址" />
        <ProFormText
          rules={[
            {
              required: true,
              message: '菜单图标不为空',
            },
          ]}
          width="md"
          name="icon"
          label="菜单图标"
          placeholder="输入菜单图标"
        />
        <ProFormRadio.Group
          name="hidden"
          label="是否隐藏"
          width="lg"
          initialValue={false}
          options={[
            {
              label: '否',
              value: false,
            },
            {
              label: '是',
              value: true,
            },
          ]}
          rules={[{ required: true, message: '选择是否隐藏' }]}
        />
        <ProFormRadio.Group
          name="type"
          label="是否为目录"
          width="lg"
          initialValue={1}
          options={[
            {
              label: '是',
              value: 1,
            },
            {
              label: '否',
              value: 2,
            },
          ]}
          rules={[{ required: true, message: '选择是否为目录' }]}
        />
        <ProFormDigit
          label="排序号"
          name="sort"
          width="md"
          min={0}
          fieldProps={{ precision: 0 }}
          rules={[{ required: true, message: '选择排序号' }]}
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default UpdateForm;
