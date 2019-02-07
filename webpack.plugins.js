const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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

module.exports = {
  getDevPlugins,
  getProdPlugins: getCommonPlugins,
};
