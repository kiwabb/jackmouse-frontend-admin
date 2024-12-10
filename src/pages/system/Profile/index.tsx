import React, { useEffect, useState } from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useIntl } from '@@/exports';
import { registerUser } from '@/services/system/Profile/api';

const TableList: React.FC = () => {
  useIntl();
  const [currentUser, setCurrentUser] = useState<API.sysCurrent>();

  useEffect(() => {
    const res = async () => {
      const user = await registerUser();
      setCurrentUser(user);
    };
    res();
  }, []);
  if (!currentUser) return <div>加载中。。。</div>;

  return (
    <PageContainer>
      <ProCard
        title="带卡片阴影"
        extra="extra"
        tooltip="这是提示"
        style={{ maxWidth: 300 }}
        boxShadow
      >
        <h1>Hello, {currentUser.name} 🥳</h1>
        <p>Name</p> <p>{currentUser.name}</p>
        <p>Email</p> <p>{currentUser.email}</p>
        <p>Phone Number</p> <p>{currentUser.phoneNumber}</p>
        <p>Role</p> <p>{currentUser.role}</p>
      </ProCard>
    </PageContainer>
  );
};
export default TableList;
