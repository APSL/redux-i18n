var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src/app.js'),
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  devServer: {
    publicPath: '/',
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      hash: false,
      inject: 'body',
      minify: {
        collapseWhitespace: true
      },
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-2', 'react'],
      }
    }]
  },
  resolve: {
    extensions: ['.js']
  }
}
