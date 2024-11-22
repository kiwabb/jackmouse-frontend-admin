import { type ActionType, ModalForm, ProFormText } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';

import { useIntl } from '@umijs/max';
import { updateUser } from '@/services/system/api';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.UserListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.UserListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = () => {
  const intl = useIntl();
  // const waitTime = (time: number = 100) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(true);
  //     }, time);
  //   });
  // };
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const actionRef = useRef<ActionType>();

  return (
    <ModalForm
      title={intl.formatMessage({
        id: 'pages.searchTable.createForm.newRule',
        defaultMessage: 'New rule',
      })}
      width="400px"
      open={createModalOpen}
      onOpenChange={handleModalOpen}
      onFinish={async (value) => {
        let data = { ...value, username: 'kiwa' };
        const success = await updateUser(data as API.UserListItem);

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
      <ProFormText width="md" name="avatar" label="头像" placeholder="请输入头像" />
      <ProFormText width="md" name="phone" label="手机号" placeholder="请输入手机号" />
      <ProFormText width="md" name="email" label="邮箱" placeholder="请输入邮箱" />
      <ProFormText width="md" name="sex" label="性别" placeholder="请输入性别" />
      <ProFormText width="md" name="enable" label="是否可用" placeholder="是否可用" />
      <ProFormText width="md" name="type" label="类型" placeholder="请输入类型" />
    </ModalForm>
  );
};

export default UpdateForm;
