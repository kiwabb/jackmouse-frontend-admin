// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

// /** 获取规则列表 GET /api/rule */
// export async function rule(
//   params: {
//     // query
//     /** 当前的页码 */
//     current?: number;
//     /** 页面的容量 */
//     pageSize?: number;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<API.UserList>('/api/rule', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }
// ---------------------------------
/** 获取用户列表 GET /system/user */
export async function user(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const data = await request('/server/api/basic-system/sysUser/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });

  const result: API.UserList = {
    data: data.data.records,
    total: data.data.totalRow,
    success: true,
  };

  return result;
}
// --------------------

/** 更新规则 PUT /api/user */
export async function updateUser(options?: { [key: string]: any }) {
  return request<API.UserListItem>('/server/api/basic-system/sysUser/update', {
    method: 'PUT',
    data: {
      method: 'update',
      ...(options || {}),
    },
  });
}

/** 新建规则 POST /api/user */
export async function addUser(options?: { [key: string]: any }) {
  return request<API.UserListItem>('/server/api/basic-system/sysUser/save', {
    method: 'POST',

    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeUser(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/server/api/basic-system/sysUser/remove/{id}', {
    method: 'DELETE',
    data: {
      method: 'delete',
      ...(options || {}),
    },
  });
}
