const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const baseWebpack = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = () => {
  return merge(baseWebpack, {
    mode: 'production',
    stats: {
      all: false,
      timings: true,
      version: true,
      builtAt: true,
      assets: true,
      assetsSort: 'field'
    },
    plugins: [
      // 定义该环境下的全局变量
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': '"production"'
        }
      }),
      new CleanWebpackPlugin(['dist/*'], {
        root: path.resolve(__dirname, '../'),
        verbose: false
      }),
      new CopyWebpackPlugin([
        {
          from: 'lib/common',
          to: 'common'
        }
      ]),
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        },
        canPrint: false
      })
    ]
  })
}
