const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const DTSBundle = require('dts-bundle')
const fs = require('fs')

function DtsBundlePlugin (name, out) {
  name = name || 'index'

  DtsBundlePlugin.prototype.apply = function (compiler) {
    compiler.plugin('done', function(){
      DTSBundle.bundle({
        name: name,
        main: './dist/' + (out || name) + '.d.ts',
        removeSource: true
      })
    })
  }
}

function RemoveEmptyFoldersPlugin (path) {
  RemoveEmptyFoldersPlugin.prototype.apply = function (compiler) {
    compiler.plugin('done', function(){
      function Route (path) {
        let files = fs.readdirSync(path)
        let i = files.length

        while (i--) {
          const location = path + '/' + files[i]
          const stats = fs.lstatSync(location)
          
          if (stats.isDirectory() && Route(location)) {
            files.splice(i, 1)
          }
        }

        const empty = !files.length

        if (empty) {
          fs.rmdirSync(path)
        }

        return empty
      }

      Route(path)
    })
  }
}


module.exports = {
  entry: {
    "web-document-writer": './src/web-document-writer.tsx',
    "web-document-reader": './src/web-document-reader.tsx'
  },

  target: 'web',
  devtool: 'source-map',
  mode : 'development',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    library: 'webDocumentWriter',
    libraryTarget: 'umd'
  },

  externals: {
    React: 'react',
    ReactDOM: 'react-dom',
    Immutable: 'immutable',
    ReactRedux: 'react-redux',
    Redux: 'redux'
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
          localIndentName: '[index]_[hash:base64:5]',
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
      }]
    }, {
      test: /\.(graph|g)ql$/,
      use: [
        'raw-loader'
      ]
    }, {
      test: /\.(svg|woff|ttf|otf|eot|xml)$/,
      use: 'file-loader'
    }]
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      '#': path.resolve(__dirname, './src')
    }
  },

  plugins: [
    new HTMLWebpackPlugin({
      filename: 'web-document-writer.html',
      template: './src/web-document-writer.html'
    }),
    new HTMLWebpackPlugin({
      filename: 'web-document-reader.html',
      template: './src/web-document-reader.html'
    }),
    new DtsBundlePlugin('index', 'web-document-writer'),
    new RemoveEmptyFoldersPlugin('./dist')
  ]
}