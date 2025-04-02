import MenuList from '@/pages/system/Menu/components/MenuList';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 *
 *
 *
 * @param fields
 */

// const handleAdd = async (fields: API.SysMenu) => {
//   const hide = message.loading('正在添加');
//   try {
//     await addMenu({...fields});
//     hide();
//     message.success('添加成功！');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('添加失败！');
//     return false;
//   }
// };

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
// const handleUpdate = async (fields: API.SysMenu) => {
//   const hide = message.loading('Configuring');
//   try {
//     await updateMenu(fields);
//     hide();
//     message.success('修改成功');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('修改失败');
//     return false;
//   }
// };

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param entity
 */
// const handleRemove = async (entity: API.SysMenu) => {
//   const hide = message.loading('正在删除');
//   if (!entity) return true;
//   try {
//     await removeMenu(entity.id);
//     hide();
//     message.success('Deleted successfully and will refresh soon');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Delete failed, please try again');
//     return false;
//   }
// };

const TableList = () => {
  return <MenuList />;
};

export default TableList;
