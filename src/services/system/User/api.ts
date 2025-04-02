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
  const data = await request<API.UserList>('/server/api/admin/user/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });

  return data;
}

export async function getDetails(id?: number, options?: { [key: string]: any }) {
  const { data } = await request<API.Result<API.UserListItem>>(`/server/api/admin/user/${id}`, {
    method: 'GET',
    params: {
      ...options,
    },
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
  return await request<API.PageResult<API.UserListItem>>(`/server/api/admin/user/getUnAssignUser`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
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
  return await request<API.PageResult<API.UserListItem>>(`/server/api/admin/user/getAssignUser`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function assignUser(assignMenu: API.AssignUser, options?: { [key: string]: any }) {
  return await request<API.Result<API.SysMenu[]>>(`/server/api/admin/role/assignUser`, {
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
export async function updateUser(data?: { [key: string]: any }) {
  return request<API.UserListItem>('/server/api/admin/user', {
    method: 'PUT',
    data,
  });
}

/** 新建用户 POST /api/User */
export async function addUser(options?: { [key: string]: any }) {
  return request<API.UserListItem>('/server/api/admin/user', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

/** 删除用户 DELETE /api/rule */
export async function removeUser(id: number | undefined, options?: Record<string, any>) {
  return request<Record<string, any>>(`/server/api/admin/user`, {
    method: 'DELETE',
    data: {
      ids: [id],
    },
    ...(options || {}),
  });
}

export async function queryCurrentUser(options?: { [key: string]: any }) {
  return request<API.Result<API.CurrentUser>>('/api/currentUser');
}
