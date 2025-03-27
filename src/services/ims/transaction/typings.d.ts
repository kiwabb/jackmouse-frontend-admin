// @ts-ignore
/* eslint-disable */

declare namespace API {
  type transactionItem = {
    id: number;
    totalProducts: number;
    totalPrice: number;
    transactionType: string;
    status: string;
    description?: string;
    note?: string;
    createdAt: string;
    product?: {
      name: string;
      sku: string;
      price: number;
      stockQuantity: number;
      categoryId: number;
      description: string;
      id: number;
      productId: number;
      imageUrl: string;
      createdAt: string;
    };
  };

  type transactionList = {
    data?: transactionItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type transactionDetail = {
    data?: transactionItem;
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
}
