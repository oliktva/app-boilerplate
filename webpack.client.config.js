const path = require('path');

const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');

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
      use: loaders.getStylesLoader()
    }]
  },
  plugins: plugins.getDevPlugins(argv),
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
