<script>
import { get, cloneDeep } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'
import { fixLength } from '../../utils'
import baseMixin from '../common/baseMixin'
import renderComponent from '../common/renderComponent'

export default {
  name: 'xt-list',
  components: {
    'xt-widget-none': () => import('../../widget/none')
  },
  mixins: [baseMixin],
  data () {
    return {
      pageable: false,
      checkable: false,
      pageInfo: null,
      value: []
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
    this.dealViewRuleProp('value', 'array', [])
    this.dealViewRuleProp('pageable', 'boolean')
    this.dealViewRuleProp('checkable', 'boolean')
    this.pageInfo = this.pageable ? {
      __pageindex: 1,
      __pagesize: Number(this.viewRule.pagesize || 20),
      __itemcount: 0
    } : null
  },
  mounted () {
    // this.dealBtnsState()
    this.executeEvent('onload')
    this.dealHeight()
  },
  methods: {
    dealHeight () {
      setTimeout(() => {
        const el = this.$el
        const elCon = el.getElementsByClassName('xt-list-con')[0]
        const elPage = el.getElementsByClassName('xt-list-page')[0]
        const elHeight = el.getBoundingClientRect().height
        const elPageHeight = elPage ? elPage.getBoundingClientRect().height : 0
        if (elHeight) {
          el.style.height = elHeight + 'px'
          elCon.style.height = (elHeight - elPageHeight) + 'px'
        }
      }, 0)
    },
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
      } else if (scope === 'checked') {
        result = realtimeValue.filter((item) => item.__$$checked)
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
      setTimeout(() => {
        this.value = cloneDeep(data.map((item, i) => {
          const rows = cloneDeep(get(this.viewRule, 'rows', {}))
          this.createValueViewRule(rows, item)
          return {
            __$$index: i,
            __$$uuid: uuidv4(),
            __$$focused: false,
            __$$checked: false,
            __$$viewRule: rows,
            ...item
          }
        }))
        console.log(this.value)
        // this.executeEvent('onchecked')
      }, 0)
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
    getPageInfo () {
      return cloneDeep(this.pageInfo)
    },
    setPageInfo (pageInfo) {
      if (pageInfo) {
        this.pageInfo = {
          __pageindex: Number(pageInfo.__pageindex),
          __pagesize: Number(pageInfo.__pagesize),
          __itemcount: Number(pageInfo.__itemcount)
        }
      } else {
        this.pageInfo = null
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
        result = realtimeValue.filter((item) => item.__$$checked)
        return result.map((item) => item.__$$index)
      } else {
        result = realtimeValue
        return result.map((item) => item.__$$index)
      }
    },
    handleChangePage (e) {
      // console.log('handleChangePage', e)
      this.pageInfo.__pageindex = e
      this.executeEvent('onload')
    },
  },
  render: function (h) {
    const rows = get(this.viewRule, 'rows', {})
    const operations = get(this.viewRule, 'operations', [])
    return h(
      'div',
      {
        attrs: {
          class: 'xt-list'
        },
        style: this.viewStyle,
      },
      [
        h(
          'div',
          {
            attrs: {
              class: 'xt-list-con'
            }
          },
          [
            (operations || []).map((item, i) => {
              return h(
                'div',
                {
                  attrs: {
                    class: `xt-list-item xt-list-item-${rows.rowsstyle}`
                  },
                  style: {
                    ...rows.style,
                    width: `calc(${rows.rowswidth || '100%'} - 20px)`
                  }
                },
                [
                  renderComponent(h, item)
                ]
              )
            }),
            this.value.map((item) => {
              return h(
                'div',
                {
                  attrs: {
                    class: `xt-list-item xt-list-item-${item.__$$viewRule.rowsstyle}`
                  },
                  style: {
                    ...item.__$$viewRule.style,
                    width: `calc(${item.__$$viewRule.rowswidth || '100%'} - 20px)`
                  },
                  on: {
                    'click': (e) => {
                      // console.log('xt-list-item click')
                      item.__$$checked = !item.__$$checked
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
                  }),
                  h('div', {
                    attrs: {
                      class: `xt-list-item-check`
                    },
                    on: {
                      'click': (e) => {
                        // el-checkbox 会向上抛点击事件 这里阻止上抛
                        // console.log('xt-list-item-check click')
                        e.stopPropagation()
                        // e.preventDefault()
                      }
                    }
                  }, [
                    h(
                      'el-checkbox',
                      {
                        props: {
                          size: 'medium',
                          value: item.__$$checked
                        },
                        on: {
                          'input': (value) => {
                            // console.log('input', value)
                            item.__$$checked = value
                          }
                        }
                      }
                    )
                  ])
                ]
              )
            }),
            !this.value.length ? h('div', {
              attrs: {
                // class: `xt-list-item xt-list-item-${rows.rowsstyle}`
                class: `xt-list-item`
              },
              style: {
                ...rows.style,
                width: `calc(${rows.rowswidth || '100%'} - 20px)`
              }
            }, [
              h('div', {
                attrs: {
                  class: `xt-list-item-none`
                }
              }, [
                h(
                  'xt-widget-none',
                  {
                    slot: 'empty'
                  }
                )
              ])
            ]) : null
          ]
        ),
        (this.pageable && this.pageInfo) ? h(
          'div',
          {
            attrs: {
              class: 'xt-list-page'
            }
          },
          [
            h(
              'el-pagination',
              {
                props: {
                  background: true,
                  small: true,
                  'current-page': this.pageInfo.__pageindex,
                  'page-size': this.pageInfo.__pagesize,
                  'total': this.pageInfo.__itemcount,
                  layout: 'prev, pager, next, total'
                },
                on: {
                  'current-change': this.handleChangePage
                }
              }
            )
          ]
        ) : null
      ]
    )
  }
}
</script>

<style scoped>
.xt-list {
  /* flex: auto; */
  width: 100%;
  display: flex;
}
.xt-list-con {
  display: flex;
  flex: auto;
  flex-wrap: wrap;
  overflow: auto;
  align-content: flex-start;
  padding: 10px;
  box-sizing: border-box;
  /* position: relative; */
}
.xt-list-item {
  display: flex;
  margin: 10px;
  width: calc(100% - 20px);
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}
.xt-list-item-card {
  border: 1px solid #ddd;
  border-radius: 3px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.xt-list-item-card:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.xt-list-item-check {
  position: absolute;
  right: 8px;
  top: 4px;
}
.xt-list-item-none {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.xt-list-page {
  flex: none;
  height: 40px;
  border: 1px solid #dfe6ec;
  border-top: none;
  padding-top: 6px;
  text-align: center;
  background-color: #f5f7fa;
  box-sizing: border-box;
}
</style>

