const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  context: process.cwd(),
  resolve: {
    extensions: ['.js', '.less', 'json'],
    modules: ['node_modules']
  },
  entry: {
    library: [
      'vue/dist/vue.esm.js',
      'vue-router',
      'vuex',
      'axios'
      // 'ant-design-vue',
      // 'moment'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../library'),
    library: '[name]'
  },
  // 简化输出信息
  stats: {
    all: false,
    timings: true,
    version: true,
    builtAt: true,
    assets: true,
    assetsSort: 'field'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: './library/[name].json'
    }),
    new CleanWebpackPlugin(['dist/*'], {
      root: path.resolve(__dirname, '../'),
      verbose: false
    })
  ]
}
