const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../../src/packages/axios.js'),
  output: {
    path: path.resolve(__dirname, '../../lib/'),
    filename: 'axios.js',
    library: 'axios',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../src/')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src/'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    }
  },
  stats: {
    all: false,
    timings: true,
    version: true,
    builtAt: true,
    errors: true,
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
    new webpack.DllReferencePlugin({
      manifest: require('../../lib/common/library.json')
    }),
    new CleanWebpackPlugin(['lib/axios.js'], {
      root: path.resolve(__dirname, '../../'),
      verbose: false
    })
  ]
}
