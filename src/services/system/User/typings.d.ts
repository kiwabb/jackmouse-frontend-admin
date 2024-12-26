// @ts-ignore
/* eslint-disable */

declare namespace API {
  type UserListItem = {
    /**
     * 主键
     */
    id?: number;
    /**
     * 头像
     */
    avatar?: null | string;

    /**
     * 邮箱
     */
    email?: number | string;
    /**
     * 是否可用
     */
    enabled?: boolean | null;
    /**
     * 用户名
     */
    username?: null | string;
    /**
     * 用户昵称
     */
    nickname?: string;
    /**
     * 登录密码
     */
    password?: null | string;
    /**
     * 手机号
     */
    phone?: null | string;
    /**
     * 性别
     */
    sex?: number | string | null;
    /**
     * 用户类型
     */
    type?: number | string;
    menuList?: API.SysMenu[];
    roleLost?: API.RuleListItem[];
    createBy?: number | null;
    createTime?: null | string;
    updateBy?: number | null;
    updateTime?: null | string;
  };
  type UserList = {
    data?: UserListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type AssignUser = {
    roleId?: number;
    userIds: (number | string | bigint)[];
  };
}
