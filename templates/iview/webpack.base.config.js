const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const projectConfig = require('./src/configs');

module.exports = {
  entry: {
    app: './src/index.js',
    vendors: './src/vendors'
  },
  output: {
    path: path.join(__dirname, './dist', projectConfig.base)
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                less: ExtractTextPlugin.extract({
                  use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                  fallback: 'vue-style-loader'
                }),
                css: ExtractTextPlugin.extract({
                  use: ['css-loader', 'autoprefixer-loader', 'less-loader'],
                  fallback: 'vue-style-loader'
                })
              }
            }
          },
          {
            loader: 'iview-loader',
            options: {
              prefix: false
            }
          }
        ]
      },
      {
        test: /iview\/.*?js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize', 'autoprefixer-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=1024'
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      'api': path.resolve(__dirname, 'src/api'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'views': path.resolve(__dirname, 'src/views'),
      'images': path.resolve(__dirname, 'src/images'),
      'styles': path.resolve(__dirname, 'src/styles'),
      'routers': path.resolve(__dirname, 'src/routers'),
      'statics': path.resolve(__dirname, 'src/statics'),
      'configs': path.resolve(__dirname, 'src/configs'),
      'filters': path.resolve(__dirname, 'src/filters'),
      'components': path.resolve(__dirname, 'src/components'),
      'directives': path.resolve(__dirname, 'src/directives'),
    }
  }
}
