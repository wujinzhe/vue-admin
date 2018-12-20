const merge = require('webpack-merge')
const baseWebpack = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const webpack = require('webpack')
const config = require('../config/')
const path = require('path')

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
      // https: true,
      quiet: true,
      hot: true,
      compress: true, // 一切服务都是用gzip压缩
      contentBase: path.resolve(__dirname, '../lib/'), // 配置静态文件目录
      watchContentBase: true, // 监听contentBase下的文件
      watchOptions: {
        poll: true
      },
      proxy: config.dev.proxy,
      // 开启服务器时，打开浏览器
      open: true,
      overlay: {
        warnings: true,
        errors: true
      },
      useLocalIp: true
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
