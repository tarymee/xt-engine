
<script>
import { get, cloneDeep } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'
import baseMixin from '../common/baseMixin'
import { Message } from 'element-ui'
import render from './render'

export default {
  name: 'xt-table',
  components: {
    'xt-widget-none': () => import('../../widget/none')
  },
  mixins: [baseMixin],
  data () {
    return {
      required: false,
      pageable: false,
      checkable: false,
      pageInfo: null,
      value: []
    }
  },
  created () {
    this.dealViewRuleProp('value', 'array', [])
    this.dealViewRuleProp('pageable', 'boolean')
    this.dealViewRuleProp('checkable', 'boolean')
    this.dealViewRuleProp('required', 'boolean')
    this.pageInfo = this.pageable ? {
      __pageindex: 1,
      __pagesize: Number(this.viewRule.pagesize || 20),
      __itemcount: 0
    } : null
  },
  mounted () {
    // https://blog.csdn.net/qq_36016136/article/details/107398528
    // setTimeout(() => {
      this.dealBtnsState()
      this.executeEvent('onchecked')
      setTimeout(() => {
        this.dealInTabboardTableHeight()
      }, 0)
    // }, 0)
  },
  methods: {
    getCellCtrlMap () {
      // todo 如果设置了 fixnumber 则应该取 el-table__fixed-body-wrapper 里的 row
      const rowsEle = this.$el.querySelectorAll('.el-table__body-wrapper .el-table__row')
      const cellCtrl = []
      rowsEle.forEach((rowEle, i) => {
        const rowsInstance = {}
        const cellsEle = rowEle.querySelectorAll('.cell')
        cellsEle.forEach((cellEle) => {
          const ctrl = cellEle.firstElementChild.__vue__
          if (ctrl && ctrl.name && ctrl.$$intable) {
            rowsInstance[ctrl.name] = ctrl
          }
        })
        cellCtrl.push(rowsInstance)
      })
      return cellCtrl
    },
    // 如果 table 里有输入型控件 那么 this.value 则非实时数据 这里取实时数据
    getRealtimeValue () {
      const realtimeValue = cloneDeep(this.value)
      const cellCtrl = this.getCellCtrlMap()
      cellCtrl.forEach((rowsInstance, i) => {
        for (const x in rowsInstance) {
          if (realtimeValue[i]) {
            realtimeValue[i][x] = rowsInstance[x].getValue()
          }
        }
      })
      return realtimeValue
    },
    getValue (getter) {
      // debugger
      const scope = get(getter, 'ctrl.scope', 'all')
      // const datatype = get(getter, 'datatype', '1')
      const realtimeValue = this.getRealtimeValue()
      // debugger
      if (scope === 'focused') {
        let result = realtimeValue.find((item) => item.__$$focused)
        return this.delInsidePropery(result)
      } else if (scope === 'checked') {
        let result = realtimeValue.filter((item) => item.__$$checked)
        return this.delInsidePropery(result)
      } else {
        return this.delInsidePropery(realtimeValue)
      }
    },
    // 删除内部属性
    delInsidePropery (data) {
      if (Array.isArray(data)) {
        data.forEach((item) => {
          item = this.delInsidePropery(item)
          // for (const x in item) {
          //   if (x.indexOf('__$$') === 0) {
          //     delete item[x]
          //   }
          // }
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
    getPageInfo () {
      return cloneDeep(this.pageInfo)
    },
    setValue (data, setter) {
      // todo 这里用js滚动到顶部
      // if (setter) {}
      this.value = []
      setTimeout(() => {
        this.value = cloneDeep(data.map((item, i) => {
          return {
            __$$index: i,
            __$$uuid: uuidv4(),
            __$$focused: false,
            __$$checked: false,
            ...item
          }
        }))
        // this.executeEvent('onchecked')
      }, 0)
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
    dealBtnsState () {
      this.viewRule.operations.forEach((item, i) => {
        const btnVm = this.$refs[`xt-table-operations-${i}`]
        if (!btnVm) return
        let checkData = this.value.filter((item) => item.__$$checked)
        if (item.readonly === 'tableCheckedNumberIsEqualToZero') {
          btnVm.setProp('readonly', checkData.length === 0)
        } else if (item.readonly === 'tableCheckedNumberIsNotEqualToOne') {
          btnVm.setProp('readonly', checkData.length !== 1)
        }
      })
    },
    dealInTabboardTableHeight () {
      // console.log()
      // console.log(this)
      // debugger
      if (this.$$intabboard) {
        const intervalFn = setInterval(() => {
          const table = this.$el
          const tableCon = this.$el.getElementsByClassName('xt-table-con')[0]
          const tablePage = this.$el.getElementsByClassName('xt-table-page')[0]
          const tableOperations = this.$el.getElementsByClassName('xt-table-operations')[0]
          const tableHeight = table.getBoundingClientRect().height
          const tablePageHeight = tablePage ? tablePage.getBoundingClientRect().height : 0
          const tableOperationsHeight = tableOperations ? tableOperations.getBoundingClientRect().height : 0
          if (tableHeight) {
            table.style.height = tableHeight + 'px'
            tableCon.style.height = (tableHeight - tablePageHeight - tableOperationsHeight) + 'px'
            clearInterval(intervalFn)
          }
        }, 500)
      }
    },
    handleSelectionChange (selection) {
      // debugger
      console.log('handleSelectionChange')
      console.log(selection)
      // debugger
      this.value.forEach((item) => {
        item.__$$checked = false
        let isin = selection.some((item2) => item2.__$$index === item.__$$index)
        isin && (item.__$$checked = true)
      })
      this.dealBtnsState()
      this.executeEvent('onchecked')
    },
    handleRowClick (row, column, event) {
      // console.log('handleRowClick')
      // console.log(row)
      // console.log(column)
      // console.log(event)
      row.__$$focused = true
      setTimeout(() => {
        row.__$$focused = false
      }, 500)
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
    delCheck () {
      const index = this.value.findIndex((item) => item.__$$checked)
      if (index !== -1) {
        this.value.splice(index, 1)
        this.delCheck()
      }
    },
    deleteInScope (scope) {
      if (scope === 'focused') {
        const index = this.value.findIndex((item) => item.__$$focused)
        if (index !== -1) {
          this.value.splice(index, 1)
          this.sortValue()
        }
      } else if (scope === 'checked') {
        this.delCheck()
        this.sortValue()
      } else {
        for (let i = 0, len = this.value.length; i < len; i++) {
          this.value.pop()
        }
      }
    },
    // type = head | tail
    append (data, type = 'tail') {
      const appendData = cloneDeep(data)
      appendData.forEach((item) => {
        item.__$$uuid = uuidv4()
        item.__$$focused = false
        item.__$$checked = false
      })
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
      console.log(this.value)
    },
    requiredValidata () {
      let res = true
      const value = this.getValue()
      if (this.required && !this.hidden && (value === '' || (Array.isArray(value) && !value.length))) {
        res = false
        Message({
          message: `${this.title}不能为空`,
          type: 'error'
        })
      }
      return res
    },
    validata () {
      let res = this.requiredValidata()
      if (res) {
        const cellCtrl = this.getCellCtrlMap()
        for (let i = 0, len = cellCtrl.length; i < len; i++) {
          for (const x in cellCtrl[i]) {
            const ctrl = cellCtrl[i][x]
            if (ctrl.isInputCtrl) {
              res = ctrl.validata()
            }
            if (!res) {
              break
            }
          }
          if (!res) {
            break
          }
        }
      }
      return res
    },
    setCheck (value, index) {
      // debugger
      setTimeout(() => {
        // console.log(this.value)
        const row = this.value[index]
        // console.log(row)
        // debugger
        if (row) {
          if (value !== row.__$$checked) {
            // debugger
            row.__$$checked = value
            this.$refs[this.code].toggleRowSelection(row)
          }
        }
      }, 0)
    }
  },
  render: function (h) {
    return render(h, this.viewRule, this)
  }
}
</script>

<style scope>
.xt-table {
  flex: auto;
  width: 100%;
  display: flex;
}
.xt-table-operations {
  border: 1px solid #EBEEF5;
  border-bottom: 0;
  padding-top: 8px;
  flex: none;
  display: flex;
}
.xt-table-con {
  flex: auto;
}
.xt-table-rowoperations {
  display: flex;
  flex-wrap: wrap;
}
.xt-table-page {
  flex: none;
  height: 40px;
  border: 1px solid #dfe6ec;
  border-top: none;
  padding-top: 6px;
  text-align: center;
  background-color: #f5f7fa;
  box-sizing: border-box;
}
.xt-table .el-table th {
  /* background-color: #eef1f6; */
  background-color: #f5f7fa;
}
.xt-table .el-table thead {
  color: #333;
}
</style>
