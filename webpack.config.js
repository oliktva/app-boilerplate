const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => ({
  entry: './src/init.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: argv.mode === 'development' ? '/' : path.resolve(__dirname, 'build') + '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.html$/,
      use: {
        loader: 'html-loader'
      }
    }, {
      test: /\.styl$/,
      use: [
        argv.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('autoprefixer')()
            ]
          }
        }, {
          loader: 'stylus-loader'
        }
      ]
    }]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new CleanWebpackPlugin(['build']),
    new MiniCssExtractPlugin({
      filename: argv.mode === 'development' ? '[name].css' : '[name].[hash].css',
      chunkFilename: argv.mode === 'development' ? '[id].css' : '[id].[hash].css',
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'build/assets'),
    historyApiFallback: true,
    stats: 'errors-only',
    open: true,
    port: 3030,
    compress: true
  },
  resolve: {
    modules: [path.resolve(__dirname), 'node_modules'],
    symlinks: false
  }
});
