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

  return data;
}

/** 获取未分配角色userid 的用户列表  */
export async function selectUnAssignUser(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return await request<API.PageResult<API.UserListItem>>(
    `/server/api/basic-system/sysUser/getUnAssignUser`,
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取已分配角色userid 的用户列表  */
export async function selectAssignUser(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return await request<API.PageResult<API.UserListItem>>(
    `/server/api/basic-system/sysUser/getAssignUser`,
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

export async function assignUser(assignMenu: API.AssignUser, options?: { [key: string]: any }) {
  return await request<API.Result<API.SysMenu[]>>(`/server/api/basic-system/sysUser/assignUser`, {
    method: 'POST',
    data: assignMenu,
    ...(options || {}),
  });
}

export async function deleteRoleUser(assignMenu: API.AssignUser, options?: { [key: string]: any }) {
  return await request<API.Result<API.SysMenu[]>>(
    `/server/api/basic-system/sysUser/deleteRoleUser`,
    {
      method: 'DELETE',
      data: assignMenu,
      ...(options || {}),
    },
  );
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
  return request<API.Result<API.CurrentUser>>('/api/currentUser');
}
