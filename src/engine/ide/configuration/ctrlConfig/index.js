import common from './common'
import { cloneDeep } from 'lodash-es'

const commonInput = [
  ...cloneDeep(common),
  {
    property: 'required',
    title: '必填',
    defalutValue: '',
    component: {
      type: 'select',
      tip: '',
      options: [
        {
          text: '默认',
          key: ''
        },
        {
          text: '是',
          key: true
        },
        {
          text: '否',
          key: true
        },
        {
          text: 'flycode',
          key: 'flycode'
        }
      ]
    }
  },
  {
    property: 'titlewidth',
    title: '标题宽度',
    defalutValue: '',
    component: {
      type: 'textinput',
      tip: ''
    }
  }
]


const typeTitleMap = {
  'layout': '布局',
  'textinput': '文本框',
  'popview': '弹窗',
}

function commonToType (type, config) {
  config.forEach((item) => {
    if (item.property === 'type') {
      item.defalutValue = type
    } else if (item.property === 'title') {
      item.defalutValue = typeTitleMap[type]
    }
  })
  return config
}



let layout = commonToType('layout', cloneDeep(common))
layout.push({
  property: 'content',
  title: '内容',
  defalutValue: [],
  component: null
})


let textinput = commonToType('textinput', cloneDeep(commonInput))

const ctrlConfig = {
  layout: layout,
  body: layout,
  textinput: textinput,
  default: cloneDeep(common),
}








export default ctrlConfig
