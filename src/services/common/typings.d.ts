// @ts-ignore
/* eslint-disable */

declare namespace API {
  // 非分页接口返回数据类型
  type Result<T> = {
    data: T;
    success?: boolean;
    errorCode: number;
    errorMessage: string;
    showType: number;
  };

  type PageResult<T> = {
    data: T[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
    page: number;
  };
}
