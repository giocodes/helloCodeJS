var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  externals: {
    jquery : "jQuery"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
    // sass
    {
        test: /\.scss$/,
        include: path.join(__dirname, 'client'),
        loaders: ["style", "css", "sass"]
      },
    // js
    {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'client')
    },
    // CSS
    {
      test: /\.css$/,
      include: path.join(__dirname, 'client'),
      loader: "style-loader!css-loader"
    }
    ]
  }
};
