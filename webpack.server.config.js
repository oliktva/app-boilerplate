const path = require('path');

const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');

const serverConfig = (env, argv) => ({
  entry: './src/server/server.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js',
    publicPath: argv.mode === 'production' ? path.resolve(__dirname, 'build') + '/' : '/'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.(tsx?|jsx?)$/,
      exclude: /node_modules/,
      use: 'awesome-typescript-loader'
    }, {
      enforce: 'pre',
      test: /\.js$/,
      loader: 'source-map-loader'
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
    symlinks: false,
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
});

const clientConfig = (env, argv) => ({
  entry: './src/server/client.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: argv.mode === 'production' ? path.resolve(__dirname, 'build') + '/' : '/'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.(tsx?|jsx?)$/,
      exclude: /node_modules/,
      use: 'awesome-typescript-loader'
    }, {
      enforce: 'pre',
      test: /\.js$/,
      loader: 'source-map-loader'
    }, {
      test: /\.html$/,
      use: 'html-loader'
    }, {
      test: /\.styl$/,
      use: loaders.getStylesLoader(),
    }]
  },
  plugins: plugins.getProdPlugins(argv),
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
    symlinks: false,
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
});

module.exports = [clientConfig, serverConfig];
