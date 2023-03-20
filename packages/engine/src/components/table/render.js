import { get, cloneDeep } from 'lodash-es'
import renderComponent from '../common/renderComponent'

// 动态创建表头
const renderColumns = function (h, viewRule, context) {
  const columns = viewRule.columns || []
  const columnsArr = []

  if (context.checkable) {
    columnsArr.push(h(
      'el-table-column',
      {
        props: {
          fixed: 'left',
          type: 'selection',
          width: 40
        }
      }
    ))
  }

  columns.forEach((item, i) => {
    const dataObj = {
      props: {
        // minWidth: Number(item.width || 150),
        minWidth: item.width || 150,
        prop: item.name,
        // label: item.title,
        label: `${item.required ? '* ' : ''}${item.title}`,
        // key: JSON.stringify(item)
        key: item.code
      }
    }
    // 冻结前几列
    // todo fixednumber 测试最多只能一个？
    if (i < Number(viewRule.fixednumber || 0)) {
      dataObj.props.fixed = true
    }

    dataObj.scopedSlots = {
      default: scope => {
        // console.log(scope)
        // console.log(55555)
        // console.log(item)
        let viewRule = Object.assign(cloneDeep(item), {
          value: scope.row[item.name],
          // 如果为默认值 则继承 table 的值
          readonly: (item.readonly !== '' && typeof item.readonly !== 'undefined') ? item.readonly : context.readonly
        })
        return renderComponent(h, viewRule, {
          ...context.viewRule,
          parent: context.parentViewRule
        })
      }
    }
    // dataObj.ref = `xt-table-item-${item.name}`

    columnsArr.push(h(
      'el-table-column',
      dataObj
    ))
  })

  if (viewRule.rowoperations && viewRule.rowoperations.length) {

    columnsArr.push(h(
      'el-table-column', {
      props: {
        // todo 这里寻找最多字数算宽度
        // minWidth: viewRule.rowoperations.length * 35,
        width: '200',
        fixed: 'right',
        label: '操作',
        key: JSON.stringify(viewRule.rowoperations)
      },
      scopedSlots: {
        default: scope => h(
          'div',
          {
            attrs: {
              class: 'xt-table-rowoperations'
            }
          },
          viewRule.rowoperations.map((item, i) => {
            return renderComponent(h, item, {
              ...context.viewRule,
              parent: context.parentViewRule
            })
          })
        )
      }
    }
    ))
  }

  return columnsArr
}

// 动态创建表格
const renderTable = function (h, viewRule, context) {
  return h(
    'el-table',
    {
      style: {
        width: '100%',
        height: '100%'
      },
      props: {
        // rowKey: viewRule.key,
        // size: 'mini',
        size: 'small',
        height: '100%',
        border: true,
        'row-key': '__$$uuid',
        // fit: true,
        data: context.value || [],
        stripe: true
      },
      // ref: `el-table`,
      ref: context.code,
      on: {
        'selection-change': context.handleSelectionChange,
        'row-click': context.handleRowClick
      }
    },
    [
      h(
        'xt-widget-none',
        {
          slot: 'empty'
        }
      ),
      ...renderColumns(h, viewRule || [], context)
    ]
  )
}


const render = function (h, viewRule, context) {
  return h(
    'div',
    {
      attrs: {
        class: 'xt-table'
      },
      style: context.viewStyle,
      // directives: [
      //     {
      //         name: 'loading',
      //         value: context.loading
      //     }
      // ]
    },
    [
      (viewRule.operations && viewRule.operations.length) ? h(
        'div',
        {
          attrs: {
            class: 'xt-table-operations'
          }
        },
        // todo: 换成普通el控件？
        viewRule.operations.map((item, i) => {
          return renderComponent(h, item, {
            ...context.viewRule,
            parent: context.parentViewRule
          }, {
            ref: `xt-table-operations-${i}`
          })
        })
      ) : null,
      h(
        'div',
        {
          attrs: {
            class: 'xt-table-con'
          }
        },
        [
          renderTable(h, viewRule, context)
        ]
      ),
      (context.pageable && context.pageInfo) ? h(
        'div',
        {
          attrs: {
            class: 'xt-table-page'
          }
        },
        [
          h(
            'el-pagination',
            {
              props: {
                background: true,
                small: true,
                'current-page': context.pageInfo.__pageindex,
                'page-size': context.pageInfo.__pagesize,
                'total': context.pageInfo.__itemcount,
                layout: 'prev, pager, next, total'
              },
              on: {
                'current-change': context.handleChangePage
              }
            }
          )
        ]
      ) : null
    ]
  )
}

export default render
