import { get, cloneDeep } from 'lodash-es'
import renderComponent from '../common/renderComponent'

// 动态创建表头
const renderColumns = function (h, viewRule, context) {
  const columns = context.columns || []
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
    const required = context.returnValueBaseOnType(item.required, 'boolean')
    const dataObj = {
      props: {
        // minWidth: Number(item.width || 150),
        minWidth: item.width || 150,
        prop: item.name,
        // label: item.title,
        label: `${required ? '* ' : ''}${item.title}`,
        // key: JSON.stringify(item)
        key: item.code
      }
    }
    // 冻结前几列
    if (i < Number(context.fixednumber || 0)) {
      dataObj.props.fixed = true
    }

    dataObj.scopedSlots = {
      default: scope => {
        // console.log(scope)
        // console.log(55555)
        // console.log(item.type, item.title)
        let viewRule = Object.assign(cloneDeep(item), {
          value: scope.row[item.name],
          // 如果为默认值 则继承 table 的值
          readonly: (item.readonly !== '' && typeof item.readonly !== 'undefined') ? item.readonly : context.readonly
        })
        return renderComponent(h, viewRule)
      }
    }
    // dataObj.ref = `xt-table-item-${item.name}`

    columnsArr.push(h(
      'el-table-column',
      dataObj
    ))
  })

  if (context.rowoperations && context.rowoperations.length) {
    let width = 20
    context.rowoperations.forEach((item) => {
      for (let i = 0, len = item.text.length; i < len; i++) {
        if (/[\u4e00-\u9fa5]/.test(item.text[i])) {
          // 中文一个字符 14
          width += 14
        } else {
          // 英文一个字符 7
          width += 7
        }
      }
      width += 10
    })
    // console.log(width)

    columnsArr.push(h(
      'el-table-column', {
      props: {
        // minWidth 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列
        // minWidth: width,
        width: width > 200 ? 200 : width, // 最大 200 超过换行
        fixed: 'right',
        label: '操作',
        key: JSON.stringify(context.rowoperations)
      },
      scopedSlots: {
        default: scope => {
          return h(
            'div',
            {
              attrs: {
                class: 'xt-table-rowoperations'
              }
            },
            context.rowoperations.map((item, i) => {
              return renderComponent(h, item)
            })
          )
        }
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
        class: `xt-table ${context.customClass}`
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
      (context.operations && context.operations.length) ? h(
        'div',
        {
          attrs: {
            class: 'xt-table-operations'
          }
        },
        context.operations.map((item, i) => {
          return renderComponent(h, item, {
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
