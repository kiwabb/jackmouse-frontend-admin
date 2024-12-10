// ims模块 请求开头默认为/server/api/ims
import { request } from '@umijs/max';

/** 获取role列表 GET /sysRole/save */

export async function role(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return await request<API.SysRoleList>('/server/api/basic-system/sysRole/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function oneRole(id?: number, options?: Record<string, any>) {
  const { data } = await request<API.SysRoleItem>(
    `/server/api/basic-system/sysRole/getInfo/${id}`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );

  return data;
}

/** 增role列表 POST /sysRole/save*/

export async function addRole(options?: { [key: string]: any }) {
  return await request<API.SysRoleItem>('/server/api/basic-system/sysRole/save', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

/** 删Role列表 DELETE sysRole/remove/${id}*/
export async function deleteRole(
  // 保持疑问应为在api中是这样的 {
  //     id: string;
  //     [property: string]: any;
  // }
  id?: number,
  options?: Record<string, any>,
) {
  return await request<API.SysRoleItem>(`/server/api/basic-system/sysRole/remove/${id}`, {
    method: 'DELETE',

    data: {
      ...(options || {}),
    },
  });
}

/** 改role列表  改： /sysRole/update */
export async function updateRole(options?: { [key: string]: any }) {
  return await request<API.SysRoleItem>(`/server/api/basic-system/sysRole/update`, {
    method: 'PUT',
    data: {
      method: 'PUT',
      ...(options || {}),
    },
  });
}
