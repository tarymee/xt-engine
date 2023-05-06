# 内置开源库
H5 引擎内置了一批较为通用的开源库，方便开发调用。

## vant
H5 引擎使用了 Vant3 作为 UI 库，支持了它所有组件以及相关的 API，封装在 service 的 vant 对象中。

访问官方学习：https://vant-contrib.gitee.io/vant/#/zh-CN

#### vant.Toast
https://vant-contrib.gitee.io/vant/#/zh-CN/toast


##### 示例：
```js
const { vant: { Toast } } = inject('service')
Toast('提示内容')

// 或者
const { vant } = inject('service')
vant.Toast('提示内容')
```

#### vant.Notify
https://vant-contrib.gitee.io/vant/#/zh-CN/notify

#### vant.Dialog
https://vant-contrib.gitee.io/vant/#/zh-CN/dialog

#### vant.ImagePreview
https://vant-contrib.gitee.io/vant/#/zh-CN/image-preview

#### vant Composition API
https://vant-contrib.gitee.io/vant/#/zh-CN/vant-use-intro

##### 示例：useWindowSize
```js
const { vant: { useWindowSize } } = inject('service')
const { width, height } = useWindowSize()

console.log(width.value) // -> 窗口宽度
console.log(height.value) // -> 窗口高度
```


## lodash
Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。

https://www.lodashjs.com/

##### 示例：
```js
const { _ } = inject('service')
const a = {
  a: 'a',
  b: 'b'
}
const b = _.cloneDeep(a)

// 或者
const { _: { cloneDeep } } = inject('service')
const c = cloneDeep(a)
```

## axios
axios 是一个易用、简洁且高效的 http 库。

H5 引擎针对它做了一层封装，添加了自动传 token 请求头，自动 loadding 弹窗等功能。

https://axios-http.com/zh/

##### 示例：
```js
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
```

## dayjs
Day.js是一个极简的JavaScript库，可以为现代浏览器解析、验证、操作和显示日期和时间。

https://dayjs.fenxianglu.cn/

##### 示例：
```js
const { dayjs } = inject('service')
dayjs().format('YYYY-MM-DD')
```

## AMapLoader
地图 JSAPI 2.0 是高德开放平台免费提供的第四代 Web 地图渲染引擎， 以 WebGL 为主要绘图手段，本着“更轻、更快、更易用”的服务原则，广泛采用了各种前沿技术，交互体验、视觉体验大幅提升，同时提供了众多新增能力和特性。

+ jsapi-v2: https://lbs.amap.com/api/jsapi-v2/summary/
+ demo: https://lbs.amap.com/demo/list/jsapi-v2

H5 引擎对其进行了封装，使之结合 Vue3 使用。

##### 示例：
```vue
<template>
  <div class="amap" :id="mapid"></div>
</template>
<script setup>
const { AMapLoader } = inject('service')
let map = null
let AMap = null
const mapid = ref(Date.now().toString())
const ininMap = async () => {
  AMap = await AMapLoader.load(
    // {
    //   plugins: ['AMap.Geolocation', 'AMap.Geocoder']
    //   AMapUI: {
    //     plugins: []
    //   }
    // }
  )
  map = new AMap.Map(mapid.value, {
    center: [105.602725, 37.076636]
  })
  map.on('complete', function () {
    console.log('地图加载完成！')
  })
}
onMounted(() => {
  ininMap()
})
onBeforeUnmount(() => {
  if (map) {
    map.destroy()
    map = null
  }
  AMap && (AMap = null)
})
</script>
<style scoped>
.amap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
```


## echarts
echarts 是一个基于 JavaScript 的开源可视化图表库。

https://echarts.apache.org/

##### 示例：
```vue
<template>
  <div class="echarts" id="Jecharts"></div>
</template>

<script setup>
const { echarts } = inject('service')
onMounted(() => {
  const echartsInstance = echarts.init(document.getElementById('Jecharts'))
  echartsInstance.setOption({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  })
})
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
```
