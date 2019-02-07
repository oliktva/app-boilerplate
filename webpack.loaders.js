const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getStylesLoader() {
  return [
    MiniCssExtractPlugin.loader,
    'css-loader', {
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          require('autoprefixer')()
        ]
      }
    }, {
      loader: 'stylus-loader',
      options: {
        import: [
          path.resolve('./src/shared/styles/app.styl')
        ]
      }
    }
  ];
}

module.exports = {
  getStylesLoader
};
