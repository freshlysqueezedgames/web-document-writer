const path = require('path')

module.exports = {
  entry: ['babel-polyfill', './src'],

  target: 'web',
  devtool: 'source-map',
  mode : 'development',

  output: {
    path: path.resolve(__dirname, './www'),
    filename: 'bundle.js'
  },

  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: "awesome-typescript-loader"
    }, {
      enforce: "pre",
      test: /\.js$/,
      loader: "source-map-loader"
    }, {
      test: /\.s?css$/,
      use: [
        'style-loader',
        {
          loader : 'css-loader',
          options : {
            modules : false
          }
        },
        'resolve-url-loader',
        {
          loader : 'sass-loader',
          options: {
            sourceMap: true,
            sourceMapContents: false
          }
        }
      ]
    }, {
      test: /\.(graph|g)ql$/,
      use: [
        'raw-loader'
      ]
    }, {
      test: /\.(svg|woff|ttf|otf|eot|xml)$/,
      use: 'file-loader'
    }, {
      test : /\.html$/,
      use: 'file-loader?name=[name].[ext]'
    }]
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      '#': path.resolve(__dirname, './src')
    }
  }
}