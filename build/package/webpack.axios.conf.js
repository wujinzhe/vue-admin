const webpack = require('webpack')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/packages/layout.js'),
  output: {
    path: path.resolve(__dirname, '../lib/'),
    filename: 'Layout.js',
    library: 'Layout',
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
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=3024'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src')
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
    new CleanWebpackPlugin(['lib/*'], {
      root: path.resolve(__dirname, '../'),
      verbose: false
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:6].css'
    }),
    // vue-loader 必须引入的插件
    new VueLoaderPlugin(),
    // 验证css的插件
    new StyleLintPlugin({
      files: ['src/**/*.{vue,htm,html,css,sss,less,scss,sass}']
    })
  ]
}
