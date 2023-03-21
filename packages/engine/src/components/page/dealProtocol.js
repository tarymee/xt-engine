import { cloneDeep, get } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'

const isObject = (arg) => {
  return Object.prototype.toString.call(arg) === '[object Object]'
}

function dealPropMap (ctrlViewRule, oldProp, newProp, valueMap) {
  // if (oldProp === 'hidden') {
  //   // debugger
  // }
  if (ctrlViewRule[oldProp] && ctrlViewRule[newProp] !== ctrlViewRule[oldProp] && oldProp !== newProp) {
    ctrlViewRule[newProp] = ctrlViewRule[oldProp]
    delete ctrlViewRule[oldProp]
  }
  if (valueMap && typeof ctrlViewRule[newProp] !== 'undefined') {
    if (ctrlViewRule[newProp] === '') {
      ctrlViewRule[newProp] = valueMap['defaultValue']
    } else if (typeof valueMap[ctrlViewRule[newProp]] !== 'undefined') {
      ctrlViewRule[newProp] = valueMap[ctrlViewRule[newProp]]
    }
  }
}

// todo 兼容旧协议 方便使用ide配置 后期可删
const dealOldView = (ctrlViewRule) => {
  // // todo 如果没定义type 一般是按钮 先简单粗暴处理
  // if (!ctrlViewRule.type) {
  //   ctrlViewRule.type = 'button'
  // }
  // if (ctrlViewRule.type === 'dropdownbox') {
  //   debugger
  // }

  dealPropMap(ctrlViewRule, 'type', 'type', {
    dropdownbox: 'select',
    infotable: 'table',
    filtertextinput: 'textinput',
    picktree: 'tree',
    datatree: 'tree',
  })

  delete ctrlViewRule.functioncode
  delete ctrlViewRule.titleflex
  delete ctrlViewRule.shape
  delete ctrlViewRule.bordercolor
  delete ctrlViewRule.bordersides

  delete ctrlViewRule.marktype
  delete ctrlViewRule.status
  delete ctrlViewRule._ide_propertytypecode
  delete ctrlViewRule._ide_componenttype
  delete ctrlViewRule._ide_name
  delete ctrlViewRule._type_ctrlarea
  delete ctrlViewRule._ide_spancol


  if (ctrlViewRule.type === 'table') {
    delete ctrlViewRule.hasheaderbar
    delete ctrlViewRule.datastructure
    delete ctrlViewRule.dynamiccols
    delete ctrlViewRule.guidecols
    delete ctrlViewRule.groupcols
    delete ctrlViewRule.defpagesize
    delete ctrlViewRule.guidecols
    delete ctrlViewRule.guidecols
  }

  if (ctrlViewRule.type === 'button') {
    dealPropMap(ctrlViewRule, 'text', 'value')
  }

  dealPropMap(ctrlViewRule, 'flexdirection', 'flexDirection', {
    horizontal: 'row',
    vertical: 'column',
  })

  dealPropMap(ctrlViewRule, 'flexwrap', 'flexWrap')
  dealPropMap(ctrlViewRule, 'justifycontent', 'justifyContent')

  dealPropMap(ctrlViewRule, 'margintop', 'marginTop')
  dealPropMap(ctrlViewRule, 'marginbottom', 'marginBottom')
  dealPropMap(ctrlViewRule, 'marginleft', 'marginLeft')
  dealPropMap(ctrlViewRule, 'marginright', 'marginRight')
  dealPropMap(ctrlViewRule, 'paddingtop', 'paddingTop')
  dealPropMap(ctrlViewRule, 'paddingbottom', 'paddingBottom')
  dealPropMap(ctrlViewRule, 'paddingleft', 'paddingLeft')
  dealPropMap(ctrlViewRule, 'paddingright', 'paddingRight')
}


const dealHandler = (handler) => {
  delete handler.key
  delete handler.successhint
  delete handler.notice
  delete handler.remark
  dealPropMap(handler, 'desc', 'title')
  Array.isArray(handler.actions) && handler.actions.forEach((item) => {
    delete handler.remark
    dealPropMap(item, 'desc', 'title')
  })
}

const dealPresenter = (presenter) => {
  Array.isArray(presenter.initial) && presenter.initial.forEach((item) => {
    dealHandler(item)
  })

  Array.isArray(presenter.interface) && presenter.interface.forEach((item) => {
    dealHandler(item)
  })

  Array.isArray(presenter.handlers) && presenter.handlers.forEach((item) => {
    dealHandler(item)
  })
}

const viewRuleAddParentcode = (ctrlViewRule, parentcode = null) => {
  if (isObject(ctrlViewRule)) {
    ctrlViewRule.parentcode = parentcode
    for (const x in ctrlViewRule) {
      let item = ctrlViewRule[x]
      if (isObject(item) && item.type) {
        viewRuleAddParentcode(item, ctrlViewRule.code)
      } else if (Array.isArray(item)) {
        item.forEach((item2) => {
          if (isObject(item2) && item2.type) {
            viewRuleAddParentcode(item2, ctrlViewRule.code)
          }
        })
      }
    }
  }
}

const viewRuleAddProps = (ctrlViewRule) => {
  dealOldView(ctrlViewRule)

  ctrlViewRule.style = ctrlViewRule.style || {}
  ctrlViewRule.code = ctrlViewRule.code || `${ctrlViewRule.type}-${uuidv4()}`

  if (ctrlViewRule.type === 'table') {
    ctrlViewRule.style.flexDirection = ctrlViewRule.style.flexDirection || ctrlViewRule.flexDirection || 'column'

    let operations = get(ctrlViewRule, 'operations', [])
    operations.forEach((item) => {
      item.type = 'button'
      item.style = {
        marginLeft: '8px',
        marginBottom: '8px'
      }
    })

    let rowoperations = get(ctrlViewRule, 'rowoperations', [])
    rowoperations.forEach((item) => {
      item.type = 'button'
      item.displaytype = 'text'
      item.style = {
        marginRight: '8px'
      }
    })
  } else if (ctrlViewRule.type === 'list') {
    ctrlViewRule.style.flexDirection = ctrlViewRule.style.flexDirection || ctrlViewRule.flexDirection || 'column'

    // let operations = get(ctrlViewRule, 'operations', [])
    // operations.forEach((item) => {
    //   item.type = 'button'
    // })

    // let rowoperations = get(ctrlViewRule, 'rowoperations', [])
    // rowoperations.forEach((item) => {
    //   item.type = 'button'
    // })
  } else if (ctrlViewRule.type === 'popview') {
    ctrlViewRule.hidden = '1'
    ctrlViewRule.style.flexDirection = ctrlViewRule.style.flexDirection || ctrlViewRule.flexDirection || 'column'

    let operations = get(ctrlViewRule, 'operations', [])
    operations.forEach((item, i) => {
      item.displaytype = (i === 0 ? 'primary' : '')
      item.type = 'button'
      item.style = {
        marginLeft: '8px'
      }
    })
  } else if (ctrlViewRule.type === 'tabboard') {
    let cards = get(ctrlViewRule, 'cards', [])
    cards.forEach((item) => {
      item.type = 'layout'
    })
  } else if (ctrlViewRule.type === 'filter') {
    ctrlViewRule.style.flexDirection = ctrlViewRule.style.flexDirection || ctrlViewRule.flexDirection || 'row'
    ctrlViewRule.style.flexWrap = ctrlViewRule.style.flexWrap || ctrlViewRule.flexWrap || 'wrap'
    ctrlViewRule.style.paddingTop = ctrlViewRule.style.paddingTop || ctrlViewRule.paddingTop || '8px'

    // ctrlViewRule.searchcondition.type = 'searchcondition'
    ctrlViewRule.searchcondition.type = 'layout'

    let basic = get(ctrlViewRule, 'searchcondition.basic', [])
    basic.forEach((item) => {
      item.style = {
        paddingRight: '0',
        width: '200px'
      }
    })
  } else if (ctrlViewRule.type === 'layout') {
    ctrlViewRule.style.flexDirection = ctrlViewRule.style.flexDirection || ctrlViewRule.flexDirection || 'column'
  }

  for (const x in ctrlViewRule) {
    let item = ctrlViewRule[x]
    if (isObject(item) && item.type) {
      viewRuleAddProps(item)
    } else if (Array.isArray(item)) {
      item.forEach((item2) => {
        if (isObject(item2) && item2.type) {
          viewRuleAddProps(item2)
        }
      })
    }
  }
}


const createViewRuleMap = (ctrlViewRule, viewRuleMap) => {
  viewRuleMap.set(ctrlViewRule.code, ctrlViewRule)
  for (const x in ctrlViewRule) {
    let item = ctrlViewRule[x]
    if (isObject(item) && item.type) {
      createViewRuleMap(item, viewRuleMap)
    } else if (Array.isArray(item)) {
      item.forEach((item2) => {
        if (isObject(item2) && item2.type) {
          createViewRuleMap(item2, viewRuleMap)
        }
      })
    }
  }
}

export const dealProtocol = (protocol) => {
  const protocolFormat = cloneDeep(protocol)
  const body = get(protocolFormat, 'view.body')
  const subviews = get(protocolFormat, 'view.subviews', [])

  // 统一处理协议
  viewRuleAddProps(body)
  subviews.forEach((item) => {
    viewRuleAddProps(item)
  })

  viewRuleAddParentcode(body)
  subviews.forEach((item) => {
    viewRuleAddParentcode(item)
  })

  dealPresenter(protocolFormat)

  const viewRuleMap = new Map()
  createViewRuleMap(body, viewRuleMap)
  subviews.forEach((item) => {
    createViewRuleMap(item, viewRuleMap)
  })

  return {
    pagecode: get(protocolFormat, 'pageinfo.code', ''),
    title: get(protocolFormat, 'pageinfo.title', ''),
    protocolFormat,
    viewRuleMap
  }
}



