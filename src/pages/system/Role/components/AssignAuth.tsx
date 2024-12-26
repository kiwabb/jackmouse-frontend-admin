import React, { useEffect, useState } from 'react';
import { assignMenu, getMenuByRoleId } from '@/services/system/Menu/api';
import { message, Modal, Tree, TreeDataNode, TreeProps } from 'antd';
import { treeify } from '@/utils/treeify';

type AssignAuthProps = {
  roleId: number | undefined;
  open: boolean;
  onOpenChange: (value: ((prevState: boolean) => boolean) | boolean) => void;
};

const AssignAuth: React.FC<AssignAuthProps> = ({ open, onOpenChange, roleId }) => {
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<(number | string | bigint)[]>([]);
  useEffect(() => {
    const getRoleMenus = async () => {
      if (roleId) {
        const { data } = await getMenuByRoleId(roleId);
        const arr: (API.SysMenu & TreeDataNode)[] = data.map((item) => {
          return { ...item, title: item.name, key: item.id };
        });
        const tree = treeify(arr, {});
        const keys = data.filter((m) => m.checked).map((m) => m.id);
        setTreeData(tree);
        setCheckedKeys(keys);
      }
    };
    getRoleMenus();
  }, [roleId]);
  const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue as number[]);
  };
  async function handlerAssign() {
    const hide = message.loading('正在添加');
    try {
      const result = await assignMenu({ roleId, menuIds: checkedKeys });
      hide();
      if (result.success) {
        message.success('权限分配成功');
        return true;
      } else {
        message.error(result.errorMessage);
        return false;
      }
    } catch (error) {
      hide();
      message.error('权限分配失败！');
      return false;
    } finally {
      setTreeData([]);
      setCheckedKeys([]);
      onOpenChange(false);
    }
  }

  return (
    <Modal
      title={'分配菜单'}
      open={open}
      onCancel={() => {
        setTreeData([]);
        setCheckedKeys([]);
        onOpenChange(false);
      }}
      onOk={handlerAssign}
    >
      <Tree
        defaultExpandAll
        checkable
        treeData={treeData}
        checkedKeys={checkedKeys}
        onCheck={onCheck}
      ></Tree>
    </Modal>
  );
};

export default AssignAuth;
