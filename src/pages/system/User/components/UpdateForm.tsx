// import {
//   ProFormDateTimePicker,
//   ProFormRadio,
//   ProFormSelect,
//   ProFormText,
//   ProFormTextArea,
//   StepsForm,
// } from '@ant-design/pro-components';
// import {FormattedMessage, useIntl} from '@umijs/max';
// import {Modal} from 'antd';
// import React from 'react';

// export type FormValueType = {
//   target?: string;
//   template?: string;
//   type?: string;
//   time?: string;
//   frequency?: string;
// } & Partial<API.UserListItem>;
//
// export type UpdateFormProps = {
//   onCancel: (flag?: boolean, formVals?: FormValueType) => void;
//   onSubmit: (values: FormValueType) => Promise<void>;
//   updateModalOpen: boolean;
//   values: Partial<API.UserListItem>;
// };

// const UpdateForm: React.FC<UpdateFormProps> = (props) => {
//   const intl = useIntl();
//   return (
// <StepsForm
//   stepsProps={{
//     size: 'small',
//   }}
//   stepsFormRender={(dom, submitter) => {
//     return (
//       <Modal
//         width={640}
//         bodyStyle={{ padding: '32px 40px 48px' }}
//         destroyOnClose
//         title={intl.formatMessage({
//           id: 'pages.searchTable.updateForm.userConfig',
//           defaultMessage: '用户编辑',
//         })}
//         open={props.updateModalOpen}
//         footer={submitter}
//         onCancel={() => {
//           props.onCancel();
//         }}
//       >
//         {dom}
//       </Modal>
//     );
//   }}
//   onFinish={props.onSubmit}
// >
//
// </StepsForm>
//     <div>1111</div>);
// };

// export default UpdateForm;
