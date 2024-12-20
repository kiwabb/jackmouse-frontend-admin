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
    headers: {
      Authorization:
        'Bearer ' +
        'eyJraWQiOiI4NDYyM2QzYi1lOTMyLTQwNmEtOTJjNC1kODQ1NmRmOTk2NDkiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiYXVkIjoiamFjay1tb3VzZS1jbGllbnQiLCJuYmYiOjE3MzQ2ODMyMzMsInJvbGUiOlsiUk9MRV9VU0VSIl0sInNjb3BlIjpbIm9wZW5pZCJdLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQwMDAiLCJleHAiOjE3MzQ3MTIwMzMsImlhdCI6MTczNDY4MzIzMywianRpIjoiNDI0OWQwNjQtMjk3Zi00YjZhLTk0ZmQtNmEwMDQxNDkzMjc2In0.jAgzzou55FD3RszGGyMK8j1hquc-EAaPUFlz2QF7leQ3ur4vY44SiexgqIa9F_2RtIVa60GT_aoN0uIfgltpqwMG4wOq2FZYk3znjrRfroS5h97LVJJW2D56Xud-cEUOfWIulDSLlFeID1EheStH6jji3ozvgqEW1Ckz7O_XOTDUIOw00-3o8dhj2okiX9A_GklNaaT98aHHHLBOhPQiZv_CPmrvuh5irLW-x5V9_-lhTwKECG559eCt_x0YacWRe9lNGqhrG47NX-6n4HI1c2dlxN__14jl3xkFJ-ddUFGcHZx-0knQanDmjNMjT9PHlSFTRaiLt1qpZ1h57pBI3A',
    },
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

/** 更新规则 PUT /api/User */
export async function updateUser(options?: { [key: string]: any }) {
  return request<API.UserListItem>('/server/api/basic-system/sysUser/update', {
    method: 'PUT',
    data: {
      method: 'update',
      ...(options || {}),
    },
  });
}

/** 新建规则 POST /api/User */
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
export async function removeUser(id: number | undefined, options?: Record<string, any>) {
  return request<Record<string, any>>(`/server/api/basic-system/sysUser/remove/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
