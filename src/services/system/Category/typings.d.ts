// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CategoryListItem = {
    id?: number | null;
    name: string;
    // products?: ProductDTO[] | null;
    [property: string]: any;
  };

  type CategoryList = {
    status: number;
    message?: boolean;
    categories?: CategoryListItem[];
    /** 列表的内容总数 */
    // total?: number;
    timestamp?: null | string;
  };
}
