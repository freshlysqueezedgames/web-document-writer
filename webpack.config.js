const path = require('path')

module.exports = {
  entry: './src',

  target: 'web',
  devtool: 'source-map',
  mode : 'development',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'web-document-writer.js',
    library: 'webDocumentWriter',
    libraryTarget: 'umd'
  },

  externals: {
    React: 'react',
    ReactDOM: 'react-dom',
    Immutable: 'immutable',
    ReactRedux: 'react-redux',
    Redux: 'redux',
    shortid: 'shortid'
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
          loader : 'typings-for-css-modules-loader',
          options : {
            modules : true,
            localIndentName: '[local]_[hash:base64:5]',
            importLoaders: 3,
            namedExport: true,
            sourceMap: true,
            camelCase: true
          }
        },
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