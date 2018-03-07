const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(webpackBaseConfig, {
  devtool: '#source-map',
  output: {
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './src',
    host: '0.0.0.0',
    port: 8811,
    hot: true,
    open: false,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('master'),
      __DEV__: true
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: Infinity,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      favicon: './src/images/favicon.png',
      href: '/',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: false,
    //   analyzerPort: 8822
    // }),
  ]
})
