// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ProductListItem = {
    id: number;
    name?: string;
    sku: string;
    stockQuantity: number;
    price: number;
    description: string;
    categoryId?: number;
    productId: number;
    imageUrl: [];
    createdAt: string;
    // products?: ProductDTO[] | null;
  };

  type ProductList = {
    data?: ProductListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
}
