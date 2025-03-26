import { Footer, Question, SelectLang, AvatarDropdown, AvatarName } from '@/components';
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import React from 'react';
import { signinRedirect } from '@/services/ant-design-pro/auth';
// import { queryCurrentUser } from '@/services/system/User/api';
import { currentUser as queryCurrentUser } from '@/services/ant-design-pro/api';

const isDev = process.env.NODE_ENV === 'development';
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const loginPath = '/User/login';

  // const fetchUserInfo = async () => {
  //   try {
  //     let user;
  //     if (history.location.pathname === signinRedirectCallbackPath) {
  //       user = await signinRedirectCallback();
  //     } else {
  //       user = await getUser();
  //     }
  //
  //     console.log('getUser', user);
  //     if (user) {
  //       localStorage.setItem('token', user.access_token);
  //     }
  //     let { data: userInfo } = await queryCurrentUser();
  //     userInfo.name = userInfo.nickname;
  //     return userInfo;
  //   } catch (error) {
  //     console.log('error:', error);
  //     signinRedirect();
  //   }
  //   return undefined;
  // };

  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  // let currentUser = await fetchUserInfo();
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
  // if (currentUser) {
  //   history.push('/');
  //   console.log('currentUser', currentUser);
  //   return {
  //     fetchUserInfo,
  //     currentUser,
  //     settings: defaultSettings as Partial<LayoutSettings>,
  //   };
  // }
  // console.log('error');
  // history.push('401');
  // return {
  //   fetchUserInfo,
  //   settings: defaultSettings as Partial<LayoutSettings>,
  // };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    avatarProps: {
      src: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.nickname,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser) {
        signinRedirect();
      }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // menu: {
    //   request: async () => {
    //     const IconMap = {
    //       smile: <SmileOutlined />,
    //       heart: <HeartOutlined />,
    //       crown: <CrownOutlined />,
    //     };
    //     const menuList: MenuDataItem[] = [];
    //     const menuData = initialState?.currentUser?.menuList;
    //     if (menuData) {
    //       menuData.forEach((item) => {
    //         let menu: MenuDataItem = {
    //           path: item.path,
    //           name: item.name,
    //           icon: item.icon && IconMap[item.icon as 'smile'],
    //           key: item.id + '',
    //           locale: false,
    //           type: item.type,
    //           id: item.id,
    //           parentId: item.parentId,
    //         };
    //         menuList.push(menu);
    //       });
    //       return treeify(menuList, {});
    //     }
    //     return menuList;
    //   },
    // },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
