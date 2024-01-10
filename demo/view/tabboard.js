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
                    console.log('取值')
                    const value = page.getCtrl('tabboard框架').value
                    console.log(value)
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
