const path = require('path')

// @vue/cli API: https://cli.vuejs.org/zh/config/
module.exports = {
  publicPath: './',
  pages: {
    index: {
      // page 的入口
      entry: 'demo/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'index',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  devServer: {
    port: '5000',
    open: true
  }
}
