const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DTSBundle = require('dts-bundle')
const fs = require('fs')

const extractCSS = new ExtractTextPlugin('styles.css')


function DtsBundlePlugin () {
  DtsBundlePlugin.prototype.apply = function (compiler) {
    compiler.plugin('done', function(){
      DTSBundle.bundle({
        name: 'index',
        main: './dist/index.d.ts',
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
      use: extractCSS.extract({
        fallback: "style-loader",
        use: [{
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
        }]
      })
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
      filename: 'index.html',
      template: './src/index.html'
    }),
    extractCSS,
    new DtsBundlePlugin(),
    new RemoveEmptyFoldersPlugin('./dist')
  ]
}