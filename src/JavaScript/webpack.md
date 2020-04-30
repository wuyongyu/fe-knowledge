# webpack

```javascript
// webpack.config.js 文件配置webpack
// definePlugin 会把定义的 string 变量插入到js代码中
```

```javascript
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || true)),
  __PRERELEASE__: JSON.stringify(
    JSON.parse(process.env.BUILD_PRERELEASE || "false")
  ),
});

module.exports = {
  entry: "main.js", // 入口文件
  output: {
    path: ".build", // 图片和js会放在这
    publicPath: "http://mycdn.com", // 这里用来生成图片的地址
    filename: "bundle.js", // 打包输出的文件
  },
  module: {
    loaders: [
      {
        test: /\.coffee$/, // test判断是否为.coffee文件，是的话进行coffee编译
        loader: "coffee-loader",
      },
      {
        test: /\.js$/, // test判断是否为.js文件，是的话进行es6和jsx的编译
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"],
        },
      },
      {
        test: /\.less$/, // 用！链式调用loader
        loader: "style-loader!css-loader!less-load",
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.(png|jpg)$/, // 内联的base64的图片地址，图片要小于8k，直接的url的地址则不解析
        loader: "url-loader?imit=8192",
      },
    ],
  },
  resolve: {
    // 现在 require 文件的时候可以直接使用 require('file')，不用使用require('file.coffee')
    extensions: ["", "js", "json", "coffee"],
  },
};
```

```javascript
// 多个入口文件，优化通用代码
// webpack.config.js
```

```js
var webpack = require("webpack");

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin("common.js"); // 引人插件
module.exports = {
  entry: {
    Profile: "./profile.js", // 为 profile 和 feed 创建自己的入口文件
    Feed: ".feed.js",
  },
  output: {
    path: "build",
    file: "[name].js", // name 是基于上边 entry 中定义的 key
  },
  plugins: [commonsPlugin],
};
```

> webpack 开发环境下编译

---

> webpack --watch 开发环境下持续的监听文件的变动来进行编译（非常快）

---

> webpack -d 引入 source maps

---

> webpack -p 产品编译和压缩 （会删除所有无作用的代码）
