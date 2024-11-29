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
export async function menu(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const { data } = await request<API.Page<API.SysMenu>>('/server/api/basic-system/sysMenu/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
  return data;
}

export async function menuTypeOne(options?: Record<string, any>) {
  const { data } = await request<API.Page<API.SysMenu>>(
    `/server/api/basic-system/sysMenu/menuTypeOne`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
  return data;
}
export async function menuById(id: number, options?: { [key: string]: any }) {
  const { data } = await request<API.Result<API.SysMenu>>(
    `/server/api/basic-system/sysMenu/getInfo/${id}`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
  return data;
}
// --------------------

/** 更新规则 PUT /api/User */
export async function updateMenu(data?: { [key: string]: any }) {
  return request<API.UserListItem>('/server/api/basic-system/sysMenu/update', {
    method: 'PUT',
    data,
  });
}

/** 新建规则 POST /api/User */
export async function addMenu(options?: { [key: string]: any }) {
  return request<API.SysMenu>('/server/api/basic-system/sysMenu/save', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeMenu(id: number, options?: Record<string, any>) {
  return request<Record<string, any>>(`/server/api/basic-system/sysMenu/remove/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
