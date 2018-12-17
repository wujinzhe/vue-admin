const merge = require('webpack-merge')
const baseWebpack = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const webpack = require('webpack')
const config = require('../config/')

module.exports = () => {
  const devWebpackConfig = merge(baseWebpack, {
    devtool: 'cheap-eval-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': '"development"'
        }
      })
    ],
    devServer: {
      clientLogLevel: 'warning',
      port: 8080,
      host: '0.0.0.0',
      quiet: true,
      hot: true,
      compress: true, // 一切服务都是用gzip压缩
      contentBase: false, // 配置静态文件目录
      proxy: config.dev.proxy,
      // 开启服务器时，打开浏览器
      open: true,
      overlay: {
        warnings: true,
        errors: true
      },
      useLocalIp: true,
      stats: {
        all: false,
        timings: true,
        version: true,
        builtAt: true,
        assets: true,
        assetsSort: 'field'
      }
    }
  })

  return new Promise((resolve, reject) => {
    portfinder.basePort = devWebpackConfig.devServer.port
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        // 重新设置过dev的端口
        devWebpackConfig.devServer.port = port
        devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`项目已经运行: http://${devWebpackConfig.devServer.host}:${port}`]
          }
        }))
        resolve(devWebpackConfig)
      }
    })
  })
}
