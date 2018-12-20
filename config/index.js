module.exports = {
  dev: {
    urlList: [
      'http://localhost:8083/js/associate.js'
    ],
    proxy: {
      '/api/mbp/': {
        // target: 'http://172.30.2.10:8080/mbp-gateway/os-mbp/', // 开发环境
        target: 'http://172.30.2.80:8080/mbp-partner/os-mbp/', //  测试环境
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
