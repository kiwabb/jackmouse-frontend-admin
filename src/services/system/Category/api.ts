// ims模块 请求开头默认为/server/api/ims
import { request } from '@umijs/max';

const BASE_URL = '/server/api/ims';

/** 获取category列表 GET /api/categories/all */
export async function category(options?: { [key: string]: any }) {
  const data = await request(BASE_URL + '/api/categories/all', {
    method: 'GET',
    ...(options || {}),
  });
  const result: API.CategoryList = {
    data: data.categories,
    total: data.categories.length,
    success: true,
  };

  // params: {
  //   // query
  //   /** 当前的页码 */
  //   current?: number;
  //   /** 页面的容量 */
  //   pageSize?: number;
  // },
  // options?: { [key: string]: any },
  // /api/categories/all为接口文档地址
  console.log(result);
  return result;
}

//addCategory
export async function addCategory(options?: { [key: string]: any }): Promise<API.CategoryListItem> {
  return request<API.CategoryListItem>(BASE_URL + '/api/categories/add', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}
