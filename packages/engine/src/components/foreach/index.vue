<script>
import { get, cloneDeep } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'
import baseMixin from '../common/baseMixin'
import renderComponent from '../common/renderComponent'

export default {
  name: 'xt-foreach',
  mixins: [baseMixin],
  data () {
    return {
      isArrayCtrl: true,
      value: this.returnViewRulePropValue('value', 'array', [])
    }
  },
  created () {
    // console.log(this.viewRule)
    this.setValue(this.value)
    // debugger
  },
  mounted () {
    this.executeEvent('onload')
  },
  methods: {
    validata () {
      // todo
      let res = true
      return res
    },
    getValue (getter) {
      // debugger
      const scope = get(getter, 'ctrl.scope', 'all')
      // const datatype = get(getter, 'datatype', '1')
      // todo
      const realtimeValue = this.getRealtimeValue()
      let result
      // debugger
      if (scope === 'focused') {
        result = realtimeValue.find((item) => item.__$$focused)
      } else if (scope === 'checked') {
        throw Error('foreach 控件不支持勾选操作 因此没有 checked 相关方法')
        // result = []
      } else {
        result = realtimeValue
      }
      result = this.delInsidePropery(result)
      return result
    },
    setValue (data, setter) {
      // todo 这里用js滚动到顶部
      // if (setter) {}
      this.value = []
      // todo 不要延时 100 添加key试试
      setTimeout(() => {
        this.value = this.createValue(data)
        // console.log(this.value)
        // this.executeEvent('onchecked')
      }, 100)
    },
    createValue (data) {
      return cloneDeep(data.map((item, i) => {
        const rows = cloneDeep(this.viewRule?.rows || {})
        // debugger
        this.createValueViewRule(rows, item)
        return {
          __$$index: i,
          __$$uuid: uuidv4(),
          __$$focused: false,
          __$$viewRule: rows,
          ...item
        }
      }))
    },
    // 删除内部属性
    delInsidePropery (data) {
      if (Array.isArray(data)) {
        data.forEach((item) => {
          item = this.delInsidePropery(item)
        })
      } else if (this.isObject(data)) {
        for (const x in data) {
          if (x.indexOf('__$$') === 0) {
            delete data[x]
          }
        }
      }
      return data
    },
    isObject (data) {
      return Object.prototype.toString.call(data) === '[object Object]'
    },
    createValueViewRule (ctrlViewRule, value) {
      if (ctrlViewRule.name && value[ctrlViewRule.name] !== undefined) {
        ctrlViewRule.value = value[ctrlViewRule.name]
        const itemViewRule = value[`__$$${ctrlViewRule.name}`]
        if (itemViewRule && this.isObject(itemViewRule)) {
          for (const x in itemViewRule) {
            ctrlViewRule[x] = itemViewRule[x]
          }
        }
      }
      for (const x in ctrlViewRule) {
        let item = ctrlViewRule[x]
        if (this.isObject(item) && item.type) {
          this.createValueViewRule(item, value)
        } else if (Array.isArray(item)) {
          item.forEach((item2) => {
            if (this.isObject(item2) && item2.type) {
              this.createValueViewRule(item2, value)
            }
          })
        }
      }
    },
    // 如果有输入型控件 那么 this.value 则非实时数据 这里取实时数据
    getRealtimeValue () {
      const realtimeValue = cloneDeep(this.value)
      // const cellCtrl = this.getAllRowsCtrlMap()
      // cellCtrl.forEach((rowsInstance, i) => {
      //   for (const x in rowsInstance) {
      //     if (realtimeValue[i]) {
      //       realtimeValue[i][x] = rowsInstance[x].getValue()
      //     }
      //   }
      // })
      return realtimeValue
    },
    getIndex (type = 'all') {
      const realtimeValue = this.getRealtimeValue()
      let result
      // debugger
      if (type === 'focused') {
        result = realtimeValue.find((item) => item.__$$focused)
        return result ? result.__$$index : null
      } else if (type === 'checked') {
        throw Error('foreach 控件不支持勾选操作 因此没有 checked 相关方法')
        // return []
      } else {
        result = realtimeValue
        return result.map((item) => item.__$$index)
      }
    },
    // 针对数组进行插入 删除等操作后 对内部 __$$index 属性重新排序
    sortValue () {
      this.value.forEach((item, i) => {
        item.__$$index = i
      })
    },
    deleteInScope (scope = 'all') {
      if (scope === 'focused') {
        const index = this.value.findIndex((item) => item.__$$focused)
        if (index !== -1) {
          this.value.splice(index, 1)
          this.sortValue()
        }
      } else {
        this.value = []
      }
    },
    // type = head | tail
    append (data, type = 'tail') {
      if (!data || !data.length) return
      const appendData = this.createValue(data)
      if (type === 'head') {
        appendData.reverse().forEach((item) => {
          this.value.unshift(item)
        })
      } else {
        appendData.forEach((item) => {
          this.value.push(item)
        })
      }
      this.sortValue()
      // console.log(this.value)
    },
    update (data = [], index = []) {
      // debugger
      if (!data || !data.length) return
      const updateValue = this.createValue(data)
      index.forEach((item, i) => {
        this.value[item] = updateValue[i]
      })
      this.sortValue()
      // console.log(this.value)
      this.$forceUpdate()
    },
    getAllRowsCtrlMap () {
      const refsArr = this.$refs
      const cellCtrl = []
      for (const x in refsArr) {
        // console.log(x)
        const arr = x.split('__$$__')
        const name = arr[0]
        const index = Number(arr[1])
        // const type = arr[2]
        if (!cellCtrl[index]) {
          cellCtrl[index] = {}
        }
        cellCtrl[index][name] = refsArr[x]
      }
      // console.log(refsArr)
      // console.log(cellCtrl)
      // debugger
      return cellCtrl
    },
    getRowsCtrlMap (indexes = []) {
      const allRowsCtrlMap = this.getAllRowsCtrlMap()
      return indexes.map((index) => {
        return allRowsCtrlMap[index]
      })
    },
  },
  render: function (h) {
    const rows = get(this.viewRule, 'rows', {})
    return h(
      'div',
      {
        attrs: {
          class: `xt-foreach ${this.customClass}`
        },
        style: this.viewStyle,
      },
      [
        this.value.map((item, index) => {
          return h(
            'div',
            {
              attrs: {
                class: `xt-foreach-item`
              },
              style: rows.style,
              on: {
                'click': (e) => {
                  // console.log('xt-foreach-item click')
                  // debugger
                  item.__$$focused = true
                  setTimeout(() => {
                    item.__$$focused = false
                  }, 500)
                  this.handleClick()
                }
              },
              key: item.__$$uuid
            },
            [
              (item.__$$viewRule.content || []).map((item2, i) => {
                return renderComponent(h, item2, {
                  // 分隔符搞特殊一点免得与用户定义的name冲突
                  ref: `${item2.name || item2.code}__$$__${index}__$$__${item2.type}`
                })
              })
            ]
          )
        })
      ]
    )
  }
}
</script>

<style scoped>
.xt-foreach {
  display: flex;
}
.xt-foreach-item {
  display: flex;
}
</style>

