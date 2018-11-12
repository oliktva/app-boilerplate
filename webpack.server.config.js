const path = require('path');

const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const serverConfig = (env, argv) => ({
  entry: './src/server/server.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'server-build'),
    filename: 'server.js',
    publicPath: argv.mode === 'production' ? path.resolve(__dirname, 'server-build') + '/' : '/'
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
      use: 'null-loader'
    }, {
      test: /\.styl$/,
      use: 'null-loader'
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: __dirname,
      verbose: true,
      dry: false,
    })
  ],
  resolve: {
    modules: [path.resolve(__dirname), 'node_modules'],
    symlinks: false
  }
});

const clientConfig = (env, argv) => ({
  entry: './src/server/client.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: argv.mode === 'production' ? path.resolve(__dirname, 'build') + '/' : '/'
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

module.exports = [clientConfig, serverConfig];
