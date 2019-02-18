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
    path: path.resolve('./build'),
    filename: 'server.js',
    publicPath: argv.mode === 'production' ? path.resolve('./build') + '/' : '/'
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
      root: path.resolve('./'),
      verbose: true,
      dry: false,
    })
  ],
  resolve: {
    modules: [path.resolve('./'), 'node_modules'],
    symlinks: false,
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  optimization: plugins.getOptimization(argv)
});

const clientConfig = (env, argv) => ({
  entry: './src/server/client.js',
  output: {
    path: path.resolve('./build'),
    filename: 'bundle.js',
    publicPath: argv.mode === 'production' ? 'http://localhost:3030/' : '/'
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
    contentBase: path.resolve('./build/assets'),
    historyApiFallback: true,
    stats: 'errors-only',
    open: true,
    port: 3030,
    compress: true
  },
  resolve: {
    modules: [path.resolve('./'), 'node_modules', 'src'],
    symlinks: false,
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  optimization: plugins.getOptimization(argv)
});

module.exports = [clientConfig, serverConfig];
