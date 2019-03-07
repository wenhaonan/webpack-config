# webpack-config
webpack以及相关插件配置

## 基础配置

**webpack.config-js**
```
const path = require('path');
module.exports = {
   //文件入口
   //单入口: "./src/app.js"
   //多入口：{A: "./..", B: "./.."}
   //多个文件整合： ["./..", "./.."]
  entry: { index: './src/app.js' },
  //出口文件
  output: {
    //上线的文件夹
    path: path.resolve(__dirname, 'dist'),
    //文件名
    filename: 'js/index.js'
  },
  plugins: [
     //配置插件
  ],
  module: {
    //配置模块的读取和解析规则，通常用来配置 Loader
    rules: [
     {
     },
     {
     }
    ]
  }
};

```
## 以下只更新需要改变的内容


## html-webpack-plugin
```
const htmlwebpackplugin = require('html-webpack-plugin');
//在plugins里配置插件
plugins: [
    new HtmlWebpackPlugin({
      //html的title
      title: 'My App',
      //文件名
      filename: 'assets/admin.html',
      //模板html文件
      template: "./BlackSearch.html",
      //需要引入的js文件
      requires: ['index']，
      //压缩
      minify：{
        //注释，去空格，大小写等
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  ]
```

## file-loader

用来处理css中的图片
```
 rules: [
     {
        //处理css中的背景图片
        test: /\.(png|jpg|...)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images/"
            }
          }
        ]
      }
    ]
```

## html-loader 

用来处理html中的图片
```
 rules: [
      {
        //处理html中的img图片
        test: /\.html$/,
        use: 'html-loader'
      }
   ]
  
```

## babel-core babel-loader babel-preset-es2015(更新为babel-preset-env)

用来把es6语法转为es5

#### .babelrc
```
{
  "presets": [
  //使用env
    [
      "env"
      // {
      //   "targets": {
      //     "IE": 10
      //   }
      // }
    ]
   //使用es2015
   [
   "es2015"
   ]
  ],
  "plugins": []
}

```
```
 rules: [
     {
        //es6转es5 exclude: 排除node文件夹
        test: /\.js$/, use: 'babel-loader', exclude: /node_modules/
      } 
]
```


## extract-text-webpack-plugin

用来抽离css样式，编译sass，less
```
const ExtractTextPlugin = require('extract-text-webpack-plugin');
  plugins: [
    //抽离css插件， 也能编译sass，less样式
    new ExtractTextPlugin({
      filename: "css/index.css"
    })
  ],
   rules: [
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader",
        publicPath:"../"
      })
    }
   ]

```

## clean-webpack-plugin

每次编译改变文件的名字，避免浏览器缓存导致客户端不更新，此插件用来清空历史文件
```
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].js'
  },
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  plugins: [
    new CleanWebpackPlugin()
  ]
```
