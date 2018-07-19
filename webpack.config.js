const webpack = require('webpack');
//const path = require('path');
module.exports = {
  devtool: 'eval-source-map',
    mode: 'development',
  entry:  __dirname + "/js/script.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname +"/webpack",//打包后的文件存放的地方
    filename: "bundles.js"//打包后输出文件的文件名
  },
  devServer: { //webpack-dev-server
    contentBase: "./webpack",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },
  module: {
    rules: [ {
        test: /\.css$/,
        use: [
            {
                loader: "style-loader"
            }, {
                loader: "css-loader",
                options: {
                    modules: true, // 指定启用css modules
                    localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                }
            }
        ]
    }]
  }
}