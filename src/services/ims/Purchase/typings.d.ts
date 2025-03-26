// @ts-ignore
/* eslint-disable */

declare namespace API {
  type SupplierListItem = {
    id: number;
    name?: string;
    address?: string;
    contactInfo?: string;

    // products?: ProductDTO[] | null;
  };

  type SupplierList = {
    data?: SupplierListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
}
