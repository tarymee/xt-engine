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
  watch: {
    hidden (newValue, oldValue) {
      if (newValue) {
        this.setValue(null)
      }
    }
  },
  created () {
  },
  mounted () {
    // this.dealBtnsState()
    // this.dealHeight()
  },
  methods: {
    validata () {
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
      } else {
        result = realtimeValue
      }
      result = this.delInsidePropery(result)
      // console.log(result)
      return result
    },
    setValue (data, setter) {
      // todo 这里用js滚动到顶部
      // if (setter) {}
      this.value = []
      // todo 不要延时 100 添加key试试
      setTimeout(() => {
        this.value = cloneDeep(data.map((item, i) => {
          const rows = cloneDeep(get(this.viewRule, 'rows', {}))
          this.createValueViewRule(rows, item)
          return {
            __$$index: i,
            __$$uuid: uuidv4(),
            __$$focused: false,
            __$$viewRule: rows,
            ...item
          }
        }))
        // console.log(this.value)
        // this.executeEvent('onchecked')
      }, 100)
    },
    // 删除内部属性
    delInsidePropery (data) {
      if (Array.isArray(data)) {
        data.forEach((item) => {
          item = this.delInsidePropery(item)
        })
      } else if (Object.prototype.toString.call(data) === '[object Object]') {
        for (const x in data) {
          if (x.indexOf('__$$') === 0) {
            delete data[x]
          }
        }
      }
      return data
    },
    createValueViewRule (ctrlViewRule, value) {
      if (ctrlViewRule.name && value[ctrlViewRule.name] !== undefined) {
        ctrlViewRule.value = value[ctrlViewRule.name]
      }
      for (const x in ctrlViewRule) {
        let item = ctrlViewRule[x]
        if (Object.prototype.toString.call(item) === '[object Object]' && item.type) {
          this.createValueViewRule(item, value)
        } else if (Array.isArray(item)) {
          item.forEach((item2) => {
            if (Object.prototype.toString.call(item2) === '[object Object]' && item2.type) {
              this.createValueViewRule(item2, value)
            }
          })
        }
      }
      return ctrlViewRule
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
      } else {
        result = realtimeValue
        return result.map((item) => item.__$$index)
      }
    },
  },
  render: function (h) {
    const rows = get(this.viewRule, 'rows', {})
    return h(
      'div',
      {
        attrs: {
          class: 'xt-foreach'
        },
        style: this.viewStyle,
      },
      [
        this.value.map((item) => {
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
              }
            },
            [
              (item.__$$viewRule.content || []).map((item2, i) => {
                return renderComponent(h, item2)
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

