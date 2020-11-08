const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

const resolve = dir => path.resolve(__dirname, '..', dir)

const webpackConfig = {
  target: 'node',
  entry: {
    server: path.join(resolve('www'), 'server.js')
  },
  output: {
    path: resolve('dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: [resolve('node_modules')]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') ? 'production' : 'development'
      }
    })
  ],
  node: {
    global: true,
    __dirname: true,
    __filename: true
  }
}

module.exports = webpackConfig
