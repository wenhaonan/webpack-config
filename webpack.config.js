const path = require('path');
const htmlwebpackplugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode:"development",
  entry: { 'index': './src/app.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/index.[hash].js'
  },
  plugins: [
    //html 插件
    new htmlwebpackplugin({
      template: "./BlackSearch.html",
      favicon: './images/favicon.png',
      requires: ['index']
    }),
    //抽离css插件， 也能编译sass，less样式
    new ExtractTextPlugin({
      filename: "css/index.css"
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
          publicPath: "../"
        })
      },
      {
        //处理css中的背景图片
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images/"
            }
          }
        ]
      },
      {
        //处理html中的img图片
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        //es6转es5 exclude: 排除node文件夹
        test: /\.js$/, use: 'babel-loader', exclude: /node_modules/
      }

    ]
  }
};
