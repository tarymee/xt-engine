<script>
import { get, cloneDeep } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'
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
      isArrayCtrl: true,
      pageable: this.returnViewRulePropValue('pageable', 'boolean'),
      checkable: this.returnViewRulePropValue('checkable', 'boolean'),
      pageInfo: null,
      rowswidth: this.returnViewRulePropValue('rowswidth', 'string', '100%'),
      rowsstyle: this.returnViewRulePropValue('rowsstyle', 'string', ''), // 'card' | ''
      value: this.returnViewRulePropValue('value', 'array', [])
    }
  },
  created () {
    this.setValue(this.value)
    this.pageInfo = this.pageable ? {
      __pageindex: 1,
      __pagesize: Number(this.viewRule.pagesize || 20),
      __itemcount: 0
    } : null
  },
  mounted () {
    this.executeEvent('onload')
    // this.dealBtnsState()
    this.dealHeight()
    this.dealHeightInTabboard()
  },
  methods: {
    dealHeightInTabboard () {
      if (this.intabboard && this.viewStyle.flex === '1' && !this.viewStyle.height) {
        // debugger
        const el = this.$el
        const elCon = el.getElementsByClassName('xt-list-con')[0]
        const elPage = el.getElementsByClassName('xt-list-page')[0]
        const intervalFn = setInterval(() => {
          const elHeight = el.getBoundingClientRect().height
          const elPageHeight = elPage ? elPage.getBoundingClientRect().height : 0
          // console.log('dealHeight')
          // console.log(elHeight)
          if (elHeight) {
            el.style.height = elHeight + 'px'
            elCon.style.height = (elHeight - elPageHeight) + 'px'
            clearInterval(intervalFn)
          }
        }, 100)
      }
    },
    dealHeight () {
      if (this.viewStyle.flex === '1' && !this.viewStyle.height) {
        const el = this.$el
        const elCon = el.getElementsByClassName('xt-list-con')[0]
        const elPage = el.getElementsByClassName('xt-list-page')[0]
        const elHeight = el.getBoundingClientRect().height
        const elPageHeight = elPage ? elPage.getBoundingClientRect().height : 0
        if (elHeight) {
          el.style.height = elHeight + 'px'
          elCon.style.height = (elHeight - elPageHeight) + 'px'
        }
      }
    },
    validata () {
      // todo
      let res = true
      return res
    },
    getValue (getter) {
      // debugger
      const scope = get(getter, 'ctrl.scope', 'all')
      // const datatype = get(getter, 'datatype', '1')
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
        this.value = this.createValue(data)
        // console.log(this.value)
        // this.executeEvent('onchecked')
      }, 100)
    },
    createValue (data) {
      return cloneDeep(data.map((item, i) => {
        const rows = cloneDeep(this.viewRule?.rows || {})
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
      const itemName = value[ctrlViewRule.name]
      const itemViewRule = value[`__$$${ctrlViewRule.name}`]
      if (ctrlViewRule.name && (itemName !== undefined || (itemViewRule && this.isObject(itemViewRule)))) {
        if (itemName !== undefined) {
          ctrlViewRule.value = itemName
        }
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
      const allRowsCtrlMap = this.getAllRowsCtrlMap()
      allRowsCtrlMap.forEach((rowsInstance, i) => {
        for (const x in rowsInstance) {
          if (realtimeValue[i]) {
            realtimeValue[i][x] = rowsInstance[x].getValue()
          }
        }
      })
      // console.log(realtimeValue)
      // console.log(allRowsCtrlMap)
      // debugger
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
      } else if (scope === 'checked') {
        this.value = this.value.filter((item) => !item.__$$checked)
        this.sortValue()
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
        if (name) {
          cellCtrl[index][name] = refsArr[x]
        }
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
    const frontoperations = get(this.viewRule, 'frontoperations', [])
    const rowoperations = get(this.viewRule, 'rowoperations', [])
    return h(
      'div',
      {
        attrs: {
          class: `xt-list ${this.customClass}`
        },
        style: this.viewStyle,
      },
      [
        h(
          'div',
          {
            attrs: {
              class: `xt-list-con xt-list-con-${this.rowsstyle}`
            }
          },
          [
            (frontoperations || []).map((item, i) => {
              return h(
                'div',
                {
                  attrs: {
                    class: `xt-list-item`
                  },
                  style: {
                    width: this.rowswidth
                  }
                },
                [
                  h(
                    'div',
                    {
                      attrs: {
                        class: `xt-list-item-row xt-list-item-row-${this.rowsstyle}`
                      },
                      style: rows.style
                    },
                    [
                      renderComponent(h, item)
                    ]
                  )
                ]
              )
            }),
            this.value.map((item, index) => {
              return h(
                'div',
                {
                  attrs: {
                    class: `xt-list-item`
                  },
                  style: {
                    width: this.rowswidth
                  },
                  on: {
                    'click': (e) => {
                      // console.log('xt-list-item click')
                      if (this.checkable) {
                        item.__$$checked = !item.__$$checked
                      }
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
                  h(
                    'div',
                    {
                      attrs: {
                        class: `xt-list-item-row xt-list-item-row-${this.rowsstyle}`
                      },
                      style: rows.style
                    },
                    [
                      (item.__$$viewRule.content || []).map((item2, i) => {
                        return renderComponent(h, item2, {
                          // 分隔符搞特殊一点免得与用户定义的name冲突
                          // ref: `${item2.name || item2.code}__$$__${index}__$$__${item2.type}`
                          ref: `${item2.name || ''}__$$__${index}__$$__${item2.type}`
                        })
                      }),
                      (this.checkable || rowoperations.length) ? h(
                        'div',
                        {
                          attrs: {
                            class: `xt-list-item-row-foot`
                          }
                        },
                        [
                          this.checkable ? h(
                            'div',
                            {
                              attrs: {
                                class: `xt-list-item-row-check`
                              },
                              on: {
                                'click': (e) => {
                                  // el-checkbox 会向上抛点击事件 这里阻止上抛
                                  // console.log('xt-list-item-row-check click')
                                  e.stopPropagation()
                                  // e.preventDefault()
                                }
                              }
                            },
                            [
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
                            ]
                          ) : null,
                          rowoperations.length ? h(
                            'div',
                            {
                              attrs: {
                                class: `xt-list-item-row-operation`
                              },
                              on: {
                                'click': (e) => {
                                  // el-checkbox 会向上抛点击事件 这里阻止上抛
                                  // console.log('xt-list-item-row-check click')
                                  e.stopPropagation()
                                  // e.preventDefault()
                                }
                              }
                            },
                            [
                              rowoperations.length === 1
                                ?
                                rowoperations.map((item3, i) => {
                                  return renderComponent(h, item3)
                                })
                                :
                                h(
                                  'el-popover',
                                  {
                                    attrs: {
                                      width: `100`,
                                      placement: `left-end`,
                                      trigger: `hover`
                                    }
                                  },
                                  [
                                    rowoperations.map((item3, i) => {
                                      return renderComponent(h, item3)
                                    }),
                                    h(
                                      'i',
                                      {
                                        attrs: {
                                          class: `el-icon-menu`
                                        },
                                        slot: 'reference'
                                      }
                                    )
                                  ]
                                )
                            ]
                          ) : null
                        ]
                      ) : null
                    ]
                  )
                ]
              )
            }),
            !this.value.length ? h('div', {
              attrs: {
                class: `xt-list-none`
              }
            }, [
              h(
                'xt-widget-none',
                {
                  slot: 'empty'
                }
              )
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
  background-color: #FFF;
  flex-direction: column;
}
.xt-list-con {
  border: 1px solid #EBEEF5;
  display: flex;
  flex: auto;
  flex-wrap: wrap;
  overflow: auto;
  align-content: flex-start;
  box-sizing: border-box;
}
.xt-list-con-card {
  padding: 8px;
}
.xt-list-item {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.xt-list-item-row {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  /* overflow: hidden; */
  position: relative;
}
.xt-list-item-row-card {
  margin: 8px;
  box-sizing: border-box;
  border: 1px solid #F1F5F8;
  border-radius: 5px;
  box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.05);
}
.xt-list-item-row-card:hover {
  border: 1px solid #eee;
  box-shadow: 0 0px 10px rgba(0, 0, 0, .1);
}
.xt-list-item-row-foot {
  /* padding: 4px 0; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.xt-list-item-row-check {
  /* padding: 4px 0; */
}
.xt-list-item-row-operation {
  display: flex;
  flex-wrap: wrap;
}
.xt-list-none {
  width: 100%;
  padding: 50px 0;
  /* flex: 1; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.xt-list-page {
  flex: none;
  height: 40px;
  border: 1px solid #ebeef5;
  border-top: none;
  padding-top: 6px;
  text-align: center;
  background-color: #fafafa;
  box-sizing: border-box;
}
</style>

