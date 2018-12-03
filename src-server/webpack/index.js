// @flow

import path from 'path'

const DEFAULT: Object = {
  target: 'web',
  devtool: 'source-map',
  mode : 'development',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: [/node_modules/, /library/],
      use: [{
        loader: 'babel-loader',
        options: {
          presets : [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-flow'
          ],
          plugins : [
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-proposal-class-properties'
          ]
        }
      }]
    }, {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
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
    }]
  },

  devServer: {
    contentBase: path.resolve(__dirname, '../dist-server'),
    compress: true,
    historyApiFallback: true
  },

  resolve: {
    alias: {}
  }
}

export function Configuration (entry: string = 'src', exit: string = 'dist'): Object {
  const config: Object = DEFAULT
  const entrydir: string = path.resolve(__dirname, '../../' + entry)
  const exitdir: string = path.resolve(__dirname, '../../' + exit)

  config.entry = ['babel-polyfill', entrydir]
  config.output.path = exitdir
  config.resolve.alias['#'] = path.resolve(__dirname, '../../src')

  return config
}