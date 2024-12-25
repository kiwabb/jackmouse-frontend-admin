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
/** 获取用户列表 GET /system/User */
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
  const data = await request<API.UserList>('/server/api/basic-system/sysUser/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });

  // const result: API.UserList = {
  //   data: data.data.records,
  //   total: data.data.totalRow,
  //   success: true,
  // };

  return data;
}
// --------------------

/** 更新用户 PUT /api/User */
export async function updateUser(options?: { [key: string]: any }) {
  return request<API.UserListItem>('/server/api/basic-system/sysUser/update', {
    method: 'PUT',
    data: {
      method: 'update',
      ...(options || {}),
    },
  });
}

/** 新建用户 POST /api/User */
export async function addUser(options?: { [key: string]: any }) {
  return request<API.UserListItem>('/server/api/basic-system/sysUser/save', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

/** 删除用户 DELETE /api/rule */
export async function removeUser(id: number | undefined, options?: Record<string, any>) {
  return request<Record<string, any>>(`/server/api/basic-system/sysUser/remove/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function queryCurrentUser(options?: { [key: string]: any }) {
  return request<API.Result<API.CurrentUser>>('/server/api/basic-system/sysUser/current');
}
