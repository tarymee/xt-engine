<template>
  <div
    v-loading="loading"
    class="v-editmap"
  >
    <div class="v-editmap-l">
      <xt-tree
        :ref="orgViewRule.name"
        :view-rule="orgViewRule"
      />
    </div>
    <div class="v-editmap-r">
      <div class="v-editmap-tit">{{ orgValue ? `当前营销区域：${orgValue.name}，请为以下子营销区域选择对应的行政区域。` : '请在左树选择要编辑的营销区域' }}</div>
      <div class="v-editmap-region">
        <div
          v-for="item in editOrgChildren"
          :key="item.id"
          class="v-editmap-region-item"
        >
          <div class="v-editmap-region-item-name">{{ item.orgname }}</div>
          <div class="v-editmap-region-item-tree">
            <xt-tree
              :ref="item.regionViewRule.name"
              :view-rule="item.regionViewRule"
            />
          </div>
        </div>
        <div
          v-if="!editOrgChildren || !editOrgChildren.length"
          class="v-editmap-region-none"
        >
          <xt-widget-none text="暂无需要编辑的子营销区域"></xt-widget-none>
        </div>
      </div>
      <div class="v-editmap-btn">
        <el-button
          type=""
          size="small"
          round
          @click="previewMap"
        >
          预览当前营销区域地图
        </el-button>
        <el-button
          type="primary"
          size="small"
          round
          @click="saveMap"
        >
          保存当前营销区域地图
        </el-button>
        <el-button
          type="danger"
          size="small"
          round
          @click="saveAllMap"
        >
          保存并生成地图文件
        </el-button>
      </div>
      <div class="v-editmap-echarts">
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
          class="v-editmap-echarts-none"
        >
          <xt-widget-none text="暂无地图数据"></xt-widget-none>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, some, cloneDeep } from 'lodash-es'
import IEcharts from 'vue-echarts-v3'
import { components } from '@/engine'
import xtWidgetNone from '../../components/none'

export default {
  // provide () {
  //   return {
  //     engine: null
  //   }
  // },
  components: {
    'IEcharts': IEcharts,
    'xt-tree': components.tree,
    'xt-widget-none': xtWidgetNone
  },
  data: function () {
    return {
      loading: false,
      loadingCount: 0,
      // tenantcode: '1011025',
      // productcode: '834683221240184837',
      tenantcode: '',
      productcode: '',
      editOrgChildren: [],
      orgValue: null,
      orgViewRule: {
        'type': 'picktree',
        'code': 'picktree-org',
        'title': '营销区域',
        'name': '营销区域',
        'placeholder': '营销区域',
        'width': '100%',
        'flex': 'none',
        'displaytype': 'navigation',
        'intermediateselectmode': '',
        'autofillvalue': '1',
        'expandmodel': 'allexpand',
        'multiselectable': false,
        'options': [],
        'eventlist': [
          {
            'trigger': 'onload',
            'handler': 'orgHandleLoad'
          },
          {
            'trigger': 'onvaluechange',
            'handler': 'orgHandlechange'
          }
        ]
      },
      regionViewRule: {
        'type': 'picktree',
        'title': '对应行政区域',
        'name': '',
        'placeholder': '请选择对应行政区域',
        'width': '100%',
        'titlewidth': '0',
        'flex': 'none',
        'displaytype': '',
        'intermediateselectmode': 'individual',
        'autofillvalue': '1',
        'expandmodel': 'rootexpand',
        'multiselectable': true,
        'options': [],
        'eventlist': [
          {
            'trigger': 'onload',
            'handler': ''
          },
          {
            'trigger': 'onvaluechange',
            'handler': 'regionHandlechange'
          }
        ]
      },
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
    // console.log(this.$route)
    this.tenantcode = this.$route.query.tenantcode
    this.productcode = this.$route.query.productcode
    this.getRegionOption()
  },
  mounted () {
    window.addEventListener('resize', this.echartsResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.echartsResize)
  },
  methods: {
    openLoading () {
      this.loadingCount++
      this.loading = true
    },
    closeLoading () {
      this.loadingCount--
      if (this.loadingCount <= 0) {
        this.loadingCount = 0
        this.loading = false
      }
    },
    echartsResize () {
      console.log('echartsResize')
      setTimeout(() => {
        this.$refs.echarts && this.$refs.echarts.resize()
      }, 50)
    },
    // echarts初始化执行
    echartsReady (instance, echarts) {
      // let that = this
      // that.echarts = echarts
      // that.instance = instance
      // console.log('echarts初始化完成')
    },
    // 点击echarts
    echartsClick (event, instance, echarts) {
      console.log(event)
      // console.log(instance)
      // console.log(echarts)
      // this.loadAndSet({
      //   name: event.data.name,
      //   namepath: event.data.namepath,
      //   adcode: event.data.adcode,
      //   adcodepath: event.data.adcodepath
      // })
    },
    echartsSetmap (mapType, geoJson) {
      if (mapType && geoJson) {
        IEcharts.registerMap(mapType, geoJson) // 注册地图
        this.option.series[0].mapType = mapType
        this.option.series[0].data = geoJson.features.map((item) => {
          return {
            name: item.properties.name,
            id: item.properties.id,
            // namepath: item.properties.namepath,
            // adcode: item.properties.adcode,
            // adcodepath: item.properties.adcodepath,
            value: null
          }
        })
      } else {
        this.option.series[0].mapType = ''
      }
      this.echartsResize()
    },
    orgGetValue () {
      const orgValue = this.$refs['营销区域'].getValue({
        ctrl: {
          component: 'fullvalue'
        }
      })
      if (orgValue) {
        orgValue.children = this.$refs['营销区域'].getProp('options').filter((item) => {
          return item.parentid === orgValue.id
        })
      }
      console.log(orgValue)
      return orgValue
    },
    getOrgOptions () {
      return this.request('/platserv/geo/listtenantorg', {
        'tenantcode': this.tenantcode,
        'productcode': this.productcode
      }).then((res) => {
        const data = get(res, 'data.resp_data')
        if (data && data.length) {
          const options = data.map((item) => {
            return {
              ...item,
              parentid: item.parentorgstructid,
              id: item.orgstructid,
              name: item.orgname,
            }
          })
          return options
        } else {
          return null
        }
      })
    },
    orgHandleLoad () {
      this.getOrgOptions().then((res) => {
        if (res) {
          this.$refs['营销区域'].setProp('options', res)
        }
      })
    },
    orgHandlechange () {
      console.log('orgHandlechange')
      this.orgValue = this.orgGetValue()
      // 先清空再重新赋值
      this.echartsSetmap()
      this.editOrgChildren = []

      if (this.orgValue) {
        setTimeout(() => {
          this.request('/platserv/geo/listOrgGeoJson', {
            tenantcode: this.tenantcode,
            productcode: this.productcode,
            orgstructid: this.orgValue.orgstructid,
          }).then((res) => {
            const data = get(res, 'data.resp_data')
            this.editOrgChildren = this.orgValue.children.map((item) => {
              let selectobj = (data && data.children) ? data.children.find((item2) => item2.orgid === item.id) : null
              const obj = {
                ...item,
                regionViewRule: {
                  ...cloneDeep(this.regionViewRule),
                  name: `region-${item.id}`,
                  value: selectobj ? selectobj.regionid : []
                }
              }
              return obj
            })
            console.log(this.editOrgChildren)
            // 查看详情时预览地图
            data && this.echartsSetmap(data.orgid, data.geojson)
          })
        }, 0)
      }
    },
    getRegionOption () {
      this.request('/platserv/geo/listAdminRegion').then((res) => {
        const data = get(res, 'data.resp_data')
        if (data && data.length) {
          const options = data.map((item) => {
            return {
              ...item,
              parentid: item.parentid,
              id: item.id,
              name: item.name,
            }
          })
          this.regionViewRule.options = options
        }
      })
    },
    regionHandlechange () {
      console.log('regionHandlechange')
    },
    getPostData () {
      console.log(this.$refs)
      let msg = ''
      if (!this.orgValue) {
        msg = '请选择营销区域'
      }
      if (msg) {
        this.$message.error(msg)
        return null
      }

      let postData = {
        orgid: this.orgValue.id,
        orgname: this.orgValue.name,
        children: this.orgValue.children.map((item) => {
          return {
            orgid: item.id,
            orgname: item.name,
            regionid: this.$refs[`region-${item.id}`][0].getValue(),
          }
        })
      }
      console.log(postData)
      for (let i = 0, len = postData.children.length; i < len; i++) {
        if (!postData.children[i].regionid) {
          msg = `请选择${postData.children[i].orgname}对应的行政区域`
          break
        }
      }
      if (msg) {
        this.$message.error(msg)
        return null
      }
      return postData
    },
    previewMap () {
      const postData = this.getPostData()
      if (!postData) {
        return
      }

      this.request('/platserv/geo/getGeoJson', postData).then((res) => {
        const data = get(res, 'data.resp_data')
        if (data) {
          // 先剔除没数据的区域
          data.features = data.features.filter(item => item.geometry)
          // 先把 cp 转成 数组
          data.features.forEach((item) => {
            // item.properties.cp = JSON.parse(item.properties.cp)
            // MultiPolygon 和 Polygon 区别
            // https://blog.csdn.net/wzwxwc1987/article/details/88582993
            // item.geometry.type = 'MultiPolygon'
          })
          console.log(data)
          this.echartsSetmap(this.orgValue.id, data)
        } else {
          this.echartsSetmap(null)
        }
      })
    },
    saveMap () {
      const postData = this.getPostData()
      if (!postData) {
        return
      }

      this.request('/platserv/geo/saveGeoJson', {
        ...postData,
        tenantcode: this.tenantcode,
        productcode: this.productcode
      }).then((res) => {
        const data = get(res, 'data.resp_data')
        if (data) {
          this.$message.success('保存成功')
        } else {
          this.$message.error('保存失败')
        }
      })
    },
    saveAllMap () {
      // todo 检测所有营销区域都编辑过 才可以保存
      this.request('/platserv/geo/saveGeoFile', {
        tenantcode: this.tenantcode,
        productcode: this.productcode,
        publishstatus: 1
      }).then((res) => {
        const data = get(res, 'data.resp_data')
        if (data) {
          this.$message.success('生成地图文件成功')
        } else {
          this.$message.error('生成地图文件失败')
        }
      })
    },
    // 点击选择右边导航
    selectRightNav (item) {
      this.loadAndSet(item, false)
    },
    request (url, postData) {
      this.openLoading()
      return this.$http.post(url, postData).then((res) => {
        console.log(res)
        return res
      }).catch((err) => {
        console.error(err)
        let msg = (err.body && err.body.error_code) || err.statusText || err
        this.$message.error(msg)
      }).finally(() => {
        this.closeLoading()
      })
    },
  }
}
</script>

<style scoped>
.v-editmap {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.v-editmap-l {
  width: 250px;
  height: 100%;
  flex: none;
  border-right: 1px solid #EEE;
  box-sizing: border-box;
}
.v-editmap-r {
  flex: 1;
  height: 100%;
  position: relative;
}
.v-editmap-tit {
  padding: 0 8px;
  line-height: 40px;
  font-weight: bold;
  font-size: 14px;
}

.v-editmap-region {
  padding: 8px;
  margin-bottom: 8px;
  height: 150px;
  overflow: auto;
  box-sizing: border-box;
}
.v-editmap-region-none {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.v-editmap-region-item {
  display: flex;
}
.v-editmap-region-item-name {
  width: 150px;
  flex: none;
  font-size: 12px;
  line-height: 32px;
  font-weight: bold;
  text-align: right;
}
.v-editmap-region-item-tree {
  flex: 1;
}
.v-editmap-btn {
  text-align: center;
}

.v-editmap-echarts {
  position: absolute;
  top: 240px;
  left: 0;
  right: 0;
  bottom: 0;
}
.v-editmap-echarts-none {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>
<style>
.v-editmap .el-loading-mask{
  z-index: 99999;
  background-color: rgba(255,255,255,0);
}
</style>
