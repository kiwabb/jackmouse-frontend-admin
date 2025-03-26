// @ts-ignore
/* eslint-disable */

declare namespace API {
  type SysRoleItem = {
    /**
     * 主键
     */

    id: number;
    /**
     * 角色名
     */
    name?: null | string;
    /**
     * 数据权限范围配置
     */
    dataScope?: null | string;
    /**
     * 是否启用
     */
    enabled?: boolean | null;
    /**
     * 角色code
     */
    code?: null | string;
    createBy?: number | null;
    createTime?: null | string;
    updateBy?: number | null;
    updateTime?: null | string;
    [property: string]: any;
  };

  type SysRoleList = {
    data?: SysRoleItem[];
    success?: boolean;
    total?: number;
  };
}
