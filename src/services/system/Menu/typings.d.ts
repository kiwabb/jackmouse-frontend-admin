// @ts-ignore
/* eslint-disable */

declare namespace API {
  export type SysMenu = {
    /**
     * 主键
     */
    id: number;
    /**
     * 前端组件地址
     */
    component?: null | string;
    css?: null | string;
    /**
     * 是否隐藏
     */
    hidden?: boolean | null;

    /**
     * 菜单名称
     */
    name: string;
    /**
     * 父菜单id
     */
    parentId?: number | null;
    /**
     * 菜单访问路径
     */
    path?: null | string;
    url?: null | string;
    /**
     * 排序
     */
    sort?: number | null;
    /**
     * 菜单类型
     */
    type?: number | null;
    updateBy?: number | null;
    updateTime?: null | string;
    createBy?: number | null;
    createTime?: null | string;
  };
}
