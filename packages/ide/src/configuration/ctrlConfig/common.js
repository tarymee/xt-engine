let config = [
  {
    property: 'type',
    title: '控件类型',
    defalutValue: '',
    component: {
      type: 'select',
      tip: '',
      placeholder: '',
      options: []
    }
  },
  {
    property: 'code',
    title: '控件code',
    defalutValue: '',
    component: {
      type: 'textinput',
      tip: '',
      placeholder: '',
      readonly: true
    }
  },
  {
    property: 'name',
    title: '控件名称',
    defalutValue: '',
    component: {
      type: 'textinput',
      tip: '用于flycode',
      placeholder: '',
    }
  },
  {
    property: 'title',
    title: '控件标题',
    defalutValue: '',
    component: {
      type: 'textinput',
      tip: '',
      placeholder: '',
    }
  },
  {
    property: 'hidden',
    title: '隐藏',
    defalutValue: '',
    component: {
      type: 'select',
      tip: '',
      placeholder: '',
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
    property: 'value',
    title: '默认值',
    defalutValue: '',
    component: {
      type: 'textinput',
      tip: '',
      placeholder: '',
    }
  },
  {
    property: 'eventlist',
    title: '事件关联',
    defalutValue: [],
    component: {
      type: 'eventlist',
      tip: '',
      placeholder: '',
    }
  },
  {
    property: 'style',
    title: 'css样式',
    defalutValue: {},
    component: {
      type: 'style',
      tip: '',
      placeholder: '',
    }
  }
]

export default config
