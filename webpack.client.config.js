const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => ({
  entry: './src/client/init.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: argv.mode === 'production' ? path.resolve(__dirname, 'build') + '/' : '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.html$/,
      use: 'html-loader'
    }, {
      test: /\.styl$/,
      use: [
        MiniCssExtractPlugin.loader,
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
      template: './src/client/index.html',
      filename: './index.html'
    }),
    new CleanWebpackPlugin(['build']),
    new MiniCssExtractPlugin({
      filename: argv.mode === 'production' ? '[name].[hash].css' : '[name].css',
      chunkFilename: argv.mode === 'production' ? '[id].[hash].css' : '[id].css',
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
    modules: [path.resolve(__dirname), 'node_modules', 'src'],
    symlinks: false
  }
});
