
<script>
import { get, cloneDeep } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'
import baseMixin from '../common/baseMixin'
import render from './render'

export default {
  name: 'xt-table',
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
  created () {
    this.value = get(this, 'viewRule.value', [])
    this.pageable = get(this, 'viewRule.pageable', false)
    this.checkable = get(this, 'viewRule.checkable', false)
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
    getValue (getter) {
      console.log(this.getCellCtrlMap())
      const scope = get(getter, 'ctrl.scope', 'all')
      // const datatype = get(getter, 'datatype', '1')
      const realtimeValue = cloneDeep(this.value)

      // 如果 table 里有输入型控件 那么 this.value 则非实时数据 这里取实时数据
      const cellCtrl = this.getCellCtrlMap()
      cellCtrl.forEach((rowsInstance, i) => {
        for (const x in rowsInstance) {
          realtimeValue[i][x] = rowsInstance[x].getValue()
        }
      })
      if (scope === 'all') {
        return realtimeValue
      } else if (scope === 'focused') {
        return realtimeValue.find((item) => item.__$$focused)
      } else if (scope === 'checked') {
        return realtimeValue.filter((item) => item.__$$checked)
      } else {
        return realtimeValue
      }

      // const result = realtimeValue.filter((item) => {
      //   if (scope === 'checked') {
      //     return item.__$$checked
      //   } else if (scope === 'focused') {
      //     return item.__$$focused
      //   } else {
      //     return true
      //   }
      // })
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
    handleSelectionChange (selection) {
      // console.log('handleSelectionChange')
      // console.log(selection)
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
    validata () {
      let res = true
      const cellCtrl = this.getCellCtrlMap()
      for (let i = 0, len = cellCtrl.length; i < len; i++) {
        for (const x in cellCtrl[i]) {
          const ctrl = cellCtrl[i][x]
          if (ctrl.isinputctrl) {
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
      return res
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
