/**
 * @name 代理的配置
 * @see 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  // 如果需要自定义本地开发服务器  请取消注释按需调整
  // 访问后端的请求都以/server/api/开头，这样不会请求本地的代理接口，
  // 请求会被代理到后端
  dev: {
    '/api/': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    },
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/server/api/': {
      // 要代理的地址
      target: 'http://localhost:6501',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/server/api': '' },
    },
    '/oidc/': {
      // 要代理的地址
      target: 'http://vjzf7r.natappfree.cc',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/oidc': '' },
    },
  },
  // fix: {
  //   // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
  //   '/ims/api/': {
  //     // 要代理的地址
  //     target: 'http://t5sqq8.natappfree.cc/ims',
  //     // target: 'http://192.168.0.184:9000',
  //     // 配置了这个可以从 http 代理到 https
  //     // 依赖 origin 的功能可能需要这个，比如 cookie
  //     changeOrigin: true,
  //     secure: false,
  //     pathRewrite: { '^/ims/api': '' },
  //   },
  //
  // },

  /**
   * @name 详细的代理配置
   * @doc https://github.com/chimurai/http-proxy-middleware
   */
  test: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
