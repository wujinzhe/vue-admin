const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  context: process.cwd(),
  mode: 'production',
  resolve: {
    extensions: ['.js', '.less', 'json'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 3024,
              name: 'element-ui.[ext]'
            }
          }
        ]
      }
    ]
  },
  entry: {
    library: [
      'vue/dist/vue.esm.js',
      'vue-router',
      'vuex',
      'axios',
      'element-ui',
      path.resolve(__dirname, '../../src/theme/default/variables.scss'),
      path.resolve(__dirname, '../../src/theme/common.scss'),
      path.resolve(__dirname, '../../src/theme/reset.scss')
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../lib/common'),
    library: '[name]'
  },
  // 简化输出信息
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
    new webpack.DllPlugin({
      name: '[name]',
      path: './lib/common/[name].json'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CleanWebpackPlugin(['lib/common'], {
      root: path.resolve(__dirname, '../../'),
      verbose: false
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      },
      canPrint: false
    })
  ]
}
