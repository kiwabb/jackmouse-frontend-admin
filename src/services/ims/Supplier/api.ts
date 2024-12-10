// ims模块 请求开头默认为/server/api/ims
import { request } from '@umijs/max';

const BASE_URL = '/server/api/ims';

/** 获取category列表 GET /api/categories/all */
export async function Supplier(options?: { [key: string]: any }) {
  const data = await request(BASE_URL + '/api/suppliers/all', {
    method: 'GET',
    ...(options || {}),
  });
  const result: API.SupplierList = {
    data: data.suppliers,
    total: data.suppliers.length,
    success: true,
  };

  console.log(result);
  return result;
}

//
export async function oneSupplier(id: number, options?: { [key: string]: any }) {
  const data = await request(BASE_URL + `/api/suppliers/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
  const supplier: API.SupplierListItem = data.supplier;

  console.log(supplier);
  return supplier;
}

// params: {
//   // query
//   /** 当前的页码 */
//   current?: number;
//   /** 页面的容量 */
//   pageSize?: number;
// },
// options?: { [key: string]: any },
// /api/categories/all为接口文档地址

//addCategory
export async function addSupplier(options?: { [key: string]: any }): Promise<API.SupplierListItem> {
  return request<API.SupplierListItem>(BASE_URL + '/api/suppliers/add', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

//updateCategory
export async function updateSupplier(id: number, options?: { [key: string]: any }) {
  const { data } = await request<API.SupplierList>(BASE_URL + `/api/suppliers/update/${id}`, {
    method: 'PUT',
    data: {
      ...(options || {}),
    },
  });
  return data;
}

//deleteCategory
export async function deleteSupplier(id: number, options?: Record<string, any>) {
  return await request<API.SupplierListItem>(BASE_URL + `/api/suppliers/delete/${id}`, {
    method: 'DELETE',
    data: {
      ...(options || {}),
    },
  });
}
