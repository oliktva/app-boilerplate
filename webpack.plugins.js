const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let uglifyPluginOptions = {
  sourceMap: true,
  uglifyOptions: {
    compress: {
      sequences: true,
      booleans: true,
      loops: true,
      unused: true,
      warnings: false,
      drop_console: true
    },
    output: {
      beautify: false,
      comments: false
    }
  }
};

function getCommonPlugins(argv) {
  return [
    new HtmlWebPackPlugin({
      template: './src/client/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: argv.mode === 'production' ? '[name].[hash].css' : '[name].css',
      chunkFilename: argv.mode === 'production' ? '[id].[hash].css' : '[id].css',
    })
  ];
}

function getClearPlugins() {
  return [new CleanWebpackPlugin(['build'])];
}

function getDevPlugins(argv) {
  return [...getClearPlugins(), ...getCommonPlugins(argv)];
}

function getProdPlugins(argv) {
  return [
    ...getCommonPlugins(argv), 
    new CssoWebpackPlugin()
  ];
}

function getOptimization(argv) {
  return {
    minimize: argv.mode === 'production',
    minimizer: [new UglifyJsPlugin(uglifyPluginOptions)]
  };
}

module.exports = {
  getDevPlugins,
  getProdPlugins,
  getOptimization,
};
