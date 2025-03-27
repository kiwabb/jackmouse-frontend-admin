// ims模块 请求开头默认为/server/api/ims
import { request } from '@umijs/max';

const BASE_URL = '/server/api/ims';

export async function addPurchase(options?: { [key: string]: any }) {
  return request(`${BASE_URL}/api/transactions/purchase`, {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

export async function addSell(options?: { [key: string]: any }) {
  return request(`${BASE_URL}/api/transactions/sell`, {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

///all?filter=
export async function getTransactionFilter(
  params: {
    current?: number;
    pageSize?: number;
    [key: string]: any;
  },
  options?: { [key: string]: any },
) {
  const data = await request(`${BASE_URL}/api/transactions/all`, {
    params: {
      ...params,
    }, // 查询条件会自动绑定在这里
    data: {
      ...(options || {}),
    },
  });

  const result: API.transactionList = {
    data: data.transactions,
    total: data.totalElements,
    success: data.message === 'success',
  };
  return result;
}

export async function getTransaction(options?: { [key: string]: any }) {
  const data = await request(`${BASE_URL}/api/transactions/all`, {
    method: 'GET',
    data: {
      ...(options || {}),
    },
  });
  const result: API.transactionList = {
    data: data.transactions,
    total: data.totalElements,
    success: data.message === 'success',
    // 多个成功状态
    //success: ['success', 'completed'].includes(data.message),
  };
  return result;
}

//http://localhost:3001/api/transactions/6

export async function getTranslationDetail(id: number, options?: { [key: string]: any }) {
  const data = await request(`${BASE_URL}/api/transactions/${id}`, {
    method: 'GET',
    data: { ...(options || {}) },
  });
  const result: API.transactionDetail = {
    data: data.transaction,
    // total: data.totalElements,
    success: data.message === 'success',
  };
  return result;
}

// export async function updateCategory(
//   id: number,
//   options?: { [key: string]: any },
// ): Promise<API.CategoryListItem> {
//   return request<API.CategoryListItem>(`${BASE_URL}/api/categories/update/${id}`, {
//     method: 'PUT',
//     data: {
//       ...(options || {}),
//     },
//   });
// }
