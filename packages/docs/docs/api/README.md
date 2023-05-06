# 介绍

H5 引擎提供了一批 API Service，以依赖注入(provide/inject)的形式注入到引擎的根组件中，方便开发调用。

**`调用方式为以 inject 方式直接获取 key 值为 'service' 的 API 对象。`**

以通用服务 axios 为例：

```vue
<template>
  <div @click="getData">获取字典值</div>
</template>
<script setup>
const { axios } = inject('service')

const getData = () => {
  axios.post('/api/teapi/dy-biz/100000000000000001/100000000001100001', {
    'pl_dictionary': {
      'dictionarycode': '893288512944738380',
      'code': '',
      'parentdickey': '',
      'status': '1',
      'objectmark': 'kx_productcategory'
    }
  }).then((res) => {
    console.log(res)
  })
}
</script>
```
