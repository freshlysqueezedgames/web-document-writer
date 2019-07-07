const path = require('path')
const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractCSS = new ExtractTextPlugin('styles.css')

function DTSBundlePlugin (root) {
  DTSBundlePlugin.prototype.apply = function (compiler) {
    compiler.plugin('done', function () {
      const dts = require('dts-bundle')

      dts.bundle({
        name: 'web-document-writer',
        main: path.resolve(__dirname, root),
        out: path.resolve(__dirname, root),
        removeSource: true,
        outputAsModuleFolder: true
      })
    })
  }
}

function RemoveEmptyFoldersPlugin (root) {
  RemoveEmptyFoldersPlugin.prototype.apply = function (compiler) {
    compiler.plugin('done', function () {
      function RemoveEmpty (dir, files) {
        let i = files.length

        while (i--) {
          const file = files[i]
          const subDir = path.resolve(__dirname, dir + '/' + file)

          if (fs.lstatSync(subDir).isFile()) {
            continue
          }
          
          if (RemoveEmpty(dir + '/' + file, fs.readdirSync(subDir))) {
            files.splice(i, 1)
          }
        }

        if (!files.length) {
          fs.rmdirSync(path.resolve(__dirname, dir))
        }

        return !files.length
      }

      const dir = path.resolve(__dirname, root)

      RemoveEmpty(root, fs.readdirSync(dir))
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
            localIndentName: '[local]_[name]_[hash:base64:5]',
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
    new DTSBundlePlugin('./dist/index.d.ts'),
    new RemoveEmptyFoldersPlugin('./dist')
  ]
}