var path = require('path')

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
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-2', 'react'],
      }
    }]
  }
}
