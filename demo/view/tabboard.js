/* eslint-disable */
export default {
  "pageinfo": {
    "code": "test",
    "title": "test"
  },
  "view": {
    "body": {
      "type": "layout",
      "flexdirection": "vertical",
      "flex": "1",
      "hidden": "",
      "style": {
        "width": "",
        "margin": ""
      },
      "content": [
        {
          "type": "layout",
          "flexdirection": "horizontal",
          "flex": "",
          "style": {
            "backgroundColor": "#eee"
          },
          "content": [
            {
              "type": "button",
              "value": "取值",
              "displaytype": "primary",
              "plain": "1",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    const value = page.getCtrl('tabboard框架').value
                    const title = page.getCtrl('tabboard框架').getProp('currentTitle')
                    console.log('取值: ', value, title)
                  `
                }
              ],
              "style": {
                "margin": "10px"
              }
            },
            {
              "type": "button",
              "value": "赋值",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    console.log('赋值')
                    page.getCtrl('tabboard框架').value = 1
                  `
                }
              ],
              "style": {
                "margin": "10px"
              }
            },
            {
              "type": "button",
              "value": "校验",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    console.log('校验')
                    const res = page.getCtrl('tabboard框架').validata()
                    console.log(res)
                  `
                }
              ],
              "style": {
                "margin": "10px"
              }
            },
            {
              "type": "button",
              "value": "切换只读",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    page.getCtrl('tabboard框架').readonly = !page.getCtrl('tabboard框架').readonly
                  `
                }
              ],
              "style": {
                "margin": "10px"
              }
            },
            {
              "type": "button",
              "value": "测试",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    console.log('测试')
                  `
                }
              ],
              "style": {
                "margin": "10px"
              }
            },
          ]
        },
        {
          "type": "tabboard",
          "name": "tabboard框架",
          "title": "基本信息",
          "value": "",
          "hidden": "",
          "direction": "vertical",
          "style": {
            "margin": "0 30px"
          },
          "cards": [
            {
              "title": "基本信息",
              "hidden": "",
              "content": [
                {
                  "type": "textinput",
                  "titlewidth": "90",
                  "title": "textinput",
                  "placeholder": "textinput",
                  "name": "",
                  "displaytype": "password",
                  "width": "100%",
                  "required": "1",
                  "eventlist": []
                },
                {
                  "type": "layout",
                  "flexdirection": "horizontal",
                  "justifyContent": "center",
                  "flex": "1",
                  "width": "",
                  "hidden": "",
                  "content": [
                    {
                      "type": "button",
                      "title": "测试",
                      "value": "测试",
                      "displaytype": "primary",
                      "width": "100",
                      "eventlist": [
                        {
                          "trigger": "onclicked",
                          "script": `
                            page.getCtrl('确认密码').value = '1'
                            // page.getCtrl('tabboard框架').hidden = true
                          `
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "title": "基本信息2",
              "hidden": "",
              "content": [
                {
                  "type": "textinput",
                  "titlewidth": "70",
                  "title": "确认密码",
                  "placeholder": "6-20个字符，区分大小写",
                  "name": "确认密码",
                  "displaytype": "password",
                  "width": "100%",
                  "required": "1",
                  "eventlist": []
                },
                {
                  "type": "button",
                  "title": "确认",
                  "value": "确认",
                  "displaytype": "primary",
                  "width": "100",
                  "eventlist": [
                    {
                      "trigger": "onclicked",
                      "script": `
                        console.log('确认')
                      `
                    }
                  ]
                }
              ]
            },
            {
              "title": "基本信息3",
              "hidden": "",
              "content": []
            }
          ],
          "eventlist": [
            {
              "trigger": "onvaluechange",
              "script": `
                // console.log(eventTarget)
                console.log('onvaluechange')
                console.log(page.getCtrl('tabboard框架').value)
              `
            },
            {
              "trigger": "onvaluechangebefore99",
              "script": `
                // 触发tab切换前事件
                console.log('onvaluechangebefore')
                console.log('当前触发的控件实例', eventTarget)
                const curvalue = page.getCtrl('tabboard框架').value
                const nextvalue = page.getCtrl('tabboard框架').getProp('nextvalue')
                console.log('当前tab序号', curvalue)
                console.log('要跳转的tab序号', nextvalue)
                // 设置是否允许跳转
                if (nextvalue % 2 === 0) {
                  page.message.success('双数允许跳转')
                  page.getCtrl('tabboard框架').setProp('iscanchange', true)
                } else {
                  page.message.error('单数不允许跳转')
                  page.getCtrl('tabboard框架').setProp('iscanchange', false)
                }
              `
            },
            {
              "trigger": "onvaluechangebefore",
              "script": `
                // 触发tab切换前事件
                if (!page.getValue('jumponvaluechangebefore')) {
                  console.log('onvaluechangebefore')
                  console.log('当前触发的控件实例', eventTarget)
                  const curvalue = page.getCtrl('tabboard框架').value
                  const nextvalue = page.getCtrl('tabboard框架').getProp('nextvalue')
                  console.log('当前tab序号', curvalue)
                  console.log('要跳转的tab序号', nextvalue)

                  page.getCtrl('tabboard框架').setProp('iscanchange', false)

                  page.confirm('确定跳转？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                  }).then(() => {
                    page.setValue('jumponvaluechangebefore', true)
                    page.getCtrl('tabboard框架').value = nextvalue
                    setTimeout(() => {
                      page.setValue('jumponvaluechangebefore', false)
                    }, 100)
                  }).catch(() => {

                  })
                }
              `
            }
          ],
        }
      ],
      "eventlist": []
    },
    "subviews": []
  },
  "presenter": {
    "initial": [],
    "interface": [],
    "handlers": []
  }
}
