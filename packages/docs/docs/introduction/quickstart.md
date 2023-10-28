# 快速开始

通过本章节你可以了解到 @smart100/web-engine 的安装方法和基本使用姿势。

## 前置条件
本项目基于 Vue2 和 Element UI ，在安装使用前请先保证您的项目已安装这两个依赖。

推荐版本：
+ "element-ui": "^2.15.5"
+ "vue": "^2.6.14"

## 安装

1、安装依赖
```bash
npm install @smart100/web-engine
```

2、在 vue.config.js 文件中 添加 transpileDependencies 属性以开启 babel 编译。

```js
module.exports = {
  ...
  transpileDependencies: ['@smart100/web-engine']
}
```

## 使用
1、完整引入 element-ui
```js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

2、创建一个 .vue 文件，写入以下代码，基于该 vue 文件创建对应的路由，访问该路由，即可看到一个基于协议生成的页面。
```vue
<template>
  <xt-page :protocol="protocol"/>
</template>

<script>
import { components } from '@smart100/web-engine'
export default {
  components: {
    'xt-page': components.page
  },
  data: function () {
    return {
      protocol: {
        pageinfo: {
          code: 'test',
          title: 'test'
        },
        view: {
          body: {
            type: 'layout',
            content: [
              {
                type: 'text',
                value: 'test'
              }
            ]
          }
        }
      }
    }
  }
}
</script>
```
