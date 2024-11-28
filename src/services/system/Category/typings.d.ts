// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CategoryListItem = {
    id?: number | null;
    name?: string;
    // products?: ProductDTO[] | null;
  };

  type CategoryList = {
    data?: CategoryListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
}
