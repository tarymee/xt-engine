# 路由服务
H5 路由使用 vue-router 4 版本。

访问官方学习：https://router.vuejs.org/zh/

H5 引擎以依赖注入(provide/inject)的形式把 vue-router 的 Composition API 注入到引擎的根组件中，方便引用。


## useRouter()
返回 router 实例。相当于在模板中使用 $router。必须在 setup() 中调用。

https://router.vuejs.org/zh/api/#router-%E6%96%B9%E6%B3%95

##### 示例：
```js
const { useRouter } = inject('service')
const router = useRouter()
const jump = () => {
  router.push('/page/1562393420100669440')
}
```

## useRoute()
返回当前路由地址。相当于在模板中使用 $route。必须在 setup() 中调用。

https://router.vuejs.org/zh/api/#routelocationnormalized

##### 示例：
```js
const { useRoute } = inject('service')
const route = useRoute()
console.log(route)
```

## 页面传参
页面参数通过路由 query 的形式传递。

##### 示例：
`页面123(list)` 跳转 `页面456(detail)`，传递参数 `id=xxx&data=xxx`。
```vue
<!-- 页面123(list) -->
<template>
  <div @click="jump">跳转</div>
</template>
<script setup>
const { useRoute, useRouter } = inject('service')
const route = useRoute()
const router = useRouter()
console.log(route)
console.log(router)

const jump = () => {
  router.push('/page/456?id=xxx&data=xxx')
}
</script>


<!-- 页面456(detail) -->
<template>
  <div>{{ id }}</div>
  <div>{{ data }}</div>
</template>
<script setup>
const { useRoute, useRouter } = inject('service')
const route = useRoute()
console.log(route.query)

const id = ref(route.query.id || '')
const data = ref(route.query.data || '')
</script>
```
