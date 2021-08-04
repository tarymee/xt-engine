

<style scoped>

</style>
<template>
  <div class="v-regionmap">
    <div class="v-regionmap-echarts">
      <IEcharts
        v-if="option.series[0].mapType !== ''"
        ref="echarts"
        :option="option"
        :not-merge="true"
        @ready="echartsReady"
        @click="echartsClick"
      ></IEcharts>
      <div
        v-if="option.series[0].mapType === ''"
        class="v-regionmap-echarts-none"
      >
        <xt-widget-none text="暂无地图数据"></xt-widget-none>
      </div>
      <!-- 导航 -->
      <div class="v-regionmap-echarts-nav">
        <div
          v-for="(item, index) in navData"
          :key="item.id"
          class="v-regionmap-echarts-nav-item"
        >
          <a @click="clickNav(item)">{{ item.name }}</a>
          <span v-if="index != navData.length - 1">&gt;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, some, cloneDeep } from 'lodash-es'
import IEcharts from 'vue-echarts-v3'
import xtWidgetNone from '../../components/none'
import { loading } from '../../service'

export default {
  // provide () {
  //   return {
  //     engine: null
  //   }
  // },
  components: {
    'IEcharts': IEcharts,
    'xt-widget-none': xtWidgetNone
  },
  data: function () {
    return {
      navData: [
        // {
        //   name: '中国',
        //   id: '100000'
        // }
      ],
      // echarts配置
      option: {
        title: {
          text: '',
          show: true
        },
        series: [
          {
            name: '行政地图',
            type: 'map',
            mapType: '',
            roam: true, // 开启鼠标缩放和平移漫游
            selectedMode: 'single',
            label: {
              normal: {
                show: true
                // formatter: function (params) {
                //   return params.name + '\n' + (params.value ? params.value : '-')
                // },
                // textStyle: {
                //   color: '#000000',
                //   fontSize: 12
                // }
              }
            },
            itemStyle: {
              normal: {
                // borderWidth: 1.5,
                borderColor: '#666',
                areaColor: '#E6EDF2'
              },
              emphasis: {
                show: true,
                label: {
                  textStyle: {
                    color: '#000'
                  }
                },
                areaColor: '#FDDC49'
              }
            },
            data: []
          }
        ]
      }
    }
  },
  created () {
    // 请求全部行政区域 找到中国 请求中国地图
    this.request('/platserv/geo/listAdminRegion').then((res) => {
      const data = get(res, 'data.resp_data')
      if (data && data.length) {
        const chinaRegion = data.find((item) => item.name === '中国')
        this.loadAndSetMap(chinaRegion)
      }
    })
  },
  mounted () {
    window.addEventListener('resize', this.echartsResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.echartsResize)
  },
  methods: {
    echartsResize () {
      console.log('echartsResize')
      setTimeout(() => {
        this.$refs.echarts && this.$refs.echarts.resize()
      }, 50)
    },
    echartsReady (instance, echarts) {
      // let that = this
      // that.echarts = echarts
      // that.instance = instance
      // console.log('echarts初始化完成')
    },
    echartsClick (event, instance, echarts) {
      console.log(event)
      this.loadAndSetMap(event.data)
    },
    echartsSetmap (mapType, geoJson) {
      if (mapType && geoJson) {
        IEcharts.registerMap(mapType, geoJson) // 注册地图
        this.option.series[0].mapType = mapType
        this.option.series[0].data = geoJson.features.map((item) => {
          return {
            name: item.properties.name,
            id: item.properties.id,
            value: null
          }
        })
      } else {
        this.option.series[0].mapType = ''
      }
      this.echartsResize()
    },
    // 点击选择右边导航
    clickNav (item) {
      this.loadAndSetMap(item, false)
    },
    loadAndSetMap (regionData, isdrill = true) {

      if (isdrill) {
        this.navData.push(cloneDeep(regionData))
      } else {
        const index = this.navData.findIndex((item) => {
          return item.name === regionData.name
        })
        this.navData = this.navData.slice(0, index + 1)
      }

      const responseMap = IEcharts.getMap(regionData.id)
      // 地图是否加载过 是的话就不再次下载了
      if (responseMap && responseMap.geoJson) {
        this.echartsSetmap(regionData.id, responseMap.geoJson)
      } else {
        this.request('/platserv/geo/getSubRegions', {
          regionid: regionData.id
        }).then((res) => {
          const data = get(res, 'data.resp_data')
          if (data && data.features && data.features.length) {
            // 先剔除没数据的区域
            data.features = data.features.filter(item => item.geometry)
            this.echartsSetmap(regionData.id, data)
          } else {
            this.echartsSetmap(null)
          }
        })
      }
    },
    request (url, postData) {
      loading.open()
      return this.$http.post(url, postData).then((res) => {
        console.log(res)
        return res
      }).catch((err) => {
        console.error(err)
        let msg = (err.body && err.body.error_code) || err.statusText || err
        this.$message.error(msg)
      }).finally(() => {
        loading.close()
      })
    },
  }
}
</script>

<style scoped>
.v-regionmap {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.v-regionmap-echarts {
  flex: 1;
  width: 100%;
  height: 100%;
}
.v-regionmap-echarts-none {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}


.v-regionmap-echarts-nav {
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 14px;
  line-height: 32px;
  background-color: #596372;
  padding: 0 12px;
  color: #FFF;
  border-radius: 4px;
}
.v-regionmap-echarts-nav-item {
  display: inline-block;
}
.v-regionmap-echarts-nav-item a {
  cursor: pointer;
}
.v-regionmap-echarts-nav-item span {
  margin: 0 4px;
}
</style>
<style>
.v-regionmap .el-loading-mask{
  z-index: 99999;
  background-color: rgba(255,255,255,0);
}
</style>
