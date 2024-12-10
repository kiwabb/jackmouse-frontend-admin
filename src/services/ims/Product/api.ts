// ims模块 请求开头默认为/server/api/ims
import { request } from '@umijs/max';

const BASE_URL = '/server/api/ims';

/** 获取Product列表 GET /api/products/all */
export async function Product(options?: { [key: string]: any }) {
  const data = await request(BASE_URL + '/api/products/all', {
    method: 'GET',
    ...(options || {}),
  });
  const result: API.ProductList = {
    data: data.products,
    total: data.products.length,
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
  // /api/products/all为接口文档地址
  console.log(result);
  return result;
}

//addProduct
export async function addProduct(record: API.ProductListItem): Promise<API.ProductListItem> {
  const formData = new FormData();
  // 遍历 record 对象，将所有键值对添加到 FormData
  Object.keys(record).forEach((key) => {
    const value = record[key as keyof API.ProductListItem];
    if (value !== undefined && value !== null) {
      formData.append(key, !(typeof value === 'string') ? JSON.stringify(value) : value);
    }
  });
  //formData.append("categoryId", "2");
  return request<API.ProductListItem>(BASE_URL + '/api/products/add', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data: formData,
  });
}

export async function deleteProduct(id: number, options?: { [key: string]: any }) {
  return await request<API.ProductListItem>(`${BASE_URL}/api/products/delete/${id}`, {
    method: 'DELETE',
    data: {
      ...(options || {}),
    },
  });
}

export async function updateProduct(
  id: number,
  record: API.ProductListItem,
): Promise<API.ProductListItem> {
  const formData = new FormData();
  // 遍历 record 对象，将所有键值对添加到 FormData
  Object.keys(record).forEach((key) => {
    const value = record[key as keyof API.ProductListItem];
    if (value !== undefined && value !== null) {
      formData.append(key, !(typeof value === 'string') ? JSON.stringify(value) : value);
    }
  });

  return request<API.ProductListItem>(`${BASE_URL}/api/products/update/${id}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'PUT',
    data: formData,
  });
}
