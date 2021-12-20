<script>
import { get } from 'lodash-es'
import EventManager from '../../event'
import renderComponent from '../common/renderComponent'
import { v4 as uuidv4 } from 'uuid'

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
  // todo 如果没定义type 一般是按钮 先简单粗暴处理
  if (!ctrlViewRule.type) {
    ctrlViewRule.type = 'button'
  }

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


  dealPropMap(ctrlViewRule, 'type', 'type', {
    dropdownbox: 'select',
    infotable: 'table',
    filtertextinput: 'textinput',
    picktree: 'tree',
    datatree: 'tree',
  })

  dealPropMap(ctrlViewRule, 'flexdirection', 'flexDirection', {
    horizontal: 'row',
    vertical: 'column',
  })


  // dealPropMap(ctrlViewRule, 'multiselectable', 'multiselectable', {
  //   'defaultValue': '',
  //   '0': false,
  //   '1': true,
  // })
  // dealPropMap(ctrlViewRule, 'hidden', 'hidden', {
  //   'defaultValue': '',
  //   '0': false,
  //   '1': true,
  // })
  // dealPropMap(ctrlViewRule, 'required', 'required', {
  //   'defaultValue': '',
  //   '0': false,
  //   '1': true,
  // })
  // dealPropMap(ctrlViewRule, 'readonly', 'readonly', {
  //   'defaultValue': '',
  //   '0': false,
  //   '1': true,
  // })
  // dealPropMap(ctrlViewRule, 'hiddenclearbtn', 'hiddenclearbtn', {
  //   'defaultValue': '',
  //   '0': false,
  //   '1': true,
  // })
  // dealPropMap(ctrlViewRule, 'pageable', 'pageable', {
  //   'defaultValue': '',
  //   '0': false,
  //   '1': true,
  // })
  // dealPropMap(ctrlViewRule, 'checkable', 'checkable', {
  //   'defaultValue': '',
  //   '0': false,
  //   '1': true,
  // })

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


// 递归处理协议 为没有 code 的控件添加 uuid
// 为 table 和 filter 里的控件添加识别属性
// todo: 优化
const dealView = (ctrlViewRule, addProps = {}) => {
  // todo 兼容旧协议 方便使用ide配置 后期可删
  dealOldView(ctrlViewRule)

  // 为没有 code 的控件添加 uuid
  if (!ctrlViewRule.code) {
    ctrlViewRule.code = uuidv4()
  }

  // 处理 popview
  if (ctrlViewRule.type === 'popview') {
    ctrlViewRule.hidden = '1'
    ctrlViewRule.flexDirection = ctrlViewRule.flexDirection || 'column'
  }

  if (ctrlViewRule.type === 'layout') {
    ctrlViewRule.flexDirection = ctrlViewRule.flexDirection || 'column'
  }

  if (ctrlViewRule.type === 'filter') {
    ctrlViewRule.flexDirection = 'row'
    ctrlViewRule.flexWrap = 'wrap'
    ctrlViewRule.paddingTop = '8'
  }

  if (ctrlViewRule.type === 'table') {
    ctrlViewRule.flexDirection = 'column'
  }

  for (const x in addProps) {
    if (!ctrlViewRule[x]) {
      ctrlViewRule[x] = addProps[x]
    }
  }


  if (ctrlViewRule.type === 'popview') {
    // popview 递归处理
    let content = get(ctrlViewRule, 'content', [])
    content.forEach((item) => {
      dealView(item, {
        $$inpopview: '1'
      })
    })

    let operations = get(ctrlViewRule, 'operations', [])
    operations.forEach((item) => {
      dealView(item, {
        type: 'button',
        $$notMap: '1',
        marginLeft: '8',
        $$inpopview: '1'
      })
    })
  } else if (ctrlViewRule.type === 'tabboard') {
    // tabboard 递归处理
    let cards = get(ctrlViewRule, 'cards', [])
    cards.forEach((item) => {
      item.type = 'layout'
      dealView(item, {
        $$notMap: '1'
      })
    })
  } else {
    // 普通 layout 递归处理
    let content = get(ctrlViewRule, 'content', [])
    content.forEach((item) => {
      dealView(item, addProps)
    })
  }

  // 基础搜索
  if (ctrlViewRule.type === 'filter') {
    let basic = get(ctrlViewRule, 'searchcondition.basic', [])
    basic.forEach((item) => {
      dealView(item, {
        $$infilter: '1',
        paddingRight: '0',
        width: '200'
      })
    })
  }


  // table
  if (ctrlViewRule.type === 'table') {
    let columns = get(ctrlViewRule, 'columns', [])
    columns.forEach((item) => {
      dealView(item, {
        $$notMap: '1',
        $$intable: '1'
      })
    })
    let operations = get(ctrlViewRule, 'operations', [])
    operations.forEach((item) => {
      dealView(item, {
        type: 'button',
        $$notMap: '1',
        marginLeft: '8',
        marginBottom: '8',
        $$intable: '1'
      })
    })
    let rowoperations = get(ctrlViewRule, 'rowoperations', [])
    rowoperations.forEach((item) => {
      dealView(item, {
        type: 'button',
        $$notMap: '1',
        $$intable: '1',
        displaytype: 'text',
        marginRight: '8'
      })
    })
  }

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

export default {
  name: 'xt-page',
  provide () {
    return {
      engine: this
    }
  },
  props: {
    protocol: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data: function () {
    return {
      loading: false,
      loadingCount: 0,
      pagecode: '',
      title: '',
      ctrlCodeMap: new Map(),
      ctrlNameCodeMap: new Map(),
      eventManager: null,
    }
  },
  created: function () {
    this.pagecode = get(this.protocol, 'pageinfo.code', '')
    this.title = get(this.protocol, 'pageinfo.title', '')

    // 统一处理协议
    dealView(this.protocol.view.body)
    if (this.protocol.view.subviews) {
      this.protocol.view.subviews.forEach((item) => {
        dealView(item)
      })
    }

    Array.isArray(this.protocol.presenter.initial) && this.protocol.presenter.initial.forEach((item) => {
      dealHandler(item)
    })

    Array.isArray(this.protocol.presenter.interface) && this.protocol.presenter.interface.forEach((item) => {
      dealHandler(item)
    })

    Array.isArray(this.protocol.presenter.handlers) && this.protocol.presenter.handlers.forEach((item) => {
      dealHandler(item)
    })

    console.log(this.protocol)


    this.eventManager = new EventManager({
      engine: this
    })
  },
  mounted () {
    this.eventManager.init()
  },
  methods: {
    openLoading () {
      this.loadingCount++
      this.loading = true
      // console.log('openLoading')
      // console.log(this.loadingCount)
    },
    closeLoading () {
      // console.log('closeLoading')
      this.loadingCount--
      if (this.loadingCount <= 0) {
        this.loadingCount = 0
        this.loading = false
      }
    }
  },
  render: function (h) {
    const body = get(this.protocol, 'view.body')
    const subviews = get(this.protocol, 'view.subviews', [])
    return h(
      'div',
      {
        attrs: {
          class: 'xt-engine xt-page',
          // 'element-loading-spinner': 'el-icon-loading',
          // 'element-loading-text': '加载中...'
        },
        directives: [
          {
            name: 'loading',
            value: this.loading,
            // modifiers: {
            //   // fullscreen: true,
            //   lock: true
            // }
          }
        ]
      },
      [
        renderComponent(h, body),
        subviews.map((item) => {
          return renderComponent(h, item)
        })
      ]
    )
  }
}

</script>

<style scope>
.xt-engine {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
}
.xt-engine .el-loading-mask{
  z-index: 99999;
  background-color: rgba(255,255,255,0);
}
</style>
