# webview

webview 组件可以以 iframe 的形式展示一个 html 网页的内容，会自动铺满它的父级元素所占的空间。



## Demo
```html
<template>
  <smt-webview :value="viewRule.value" :hastoken="viewRule.hastoken" @onload="onload" />
</template>

<script setup>
const viewRule = reactive({
  title: 'webview',
  value: 'https://www.baidu.com/',
  hastoken: true
})

const onload = (e) => {
  console.log('onload')
  console.log(e)
}
</script>
```


## Attributes
| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ---- | ---- |
| title | 标题 | string | ---- | ---- |
| value | 需要展示的网页链接 | string | ---- | ---- |
| hastoken | 是否自动在链接后拼接携带当前登录人的 token 等参数 | boolean | false | boolean |
| onload | iframe 成功加载时的回调 | Function | ---- | ---- |
