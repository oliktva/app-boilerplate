const path = require('path');

const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');

module.exports = (env, argv) => ({
  entry: './src/client/init.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
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
      use: 'html-loader'
    }, {
      test: /\.styl$/,
      use: loaders.getStylesLoader()
    }]
  },
  plugins: plugins.getDevPlugins(argv),
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
  }
});
