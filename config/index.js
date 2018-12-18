module.exports = {
  dev: {
    urlList: [
      'http://172.30.61.123/vue-admin-app2/dist/js/associate.js'
    ],
    proxy: {
      '/api/mbp/': {
        target: 'http://172.30.2.13:8080/mbp-gateway/', // 开发环境
        changeOrigin: true,
        pathRewrite: {
          '^/api/mbp/': ''
        }
      }
    }
  },
  prod: {
    urlList: [
      'http://172.30.61.123/vue-admin-app2/dist/js/associate.js'
    ]
  }
}
