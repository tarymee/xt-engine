/* eslint-disable */
export default {
  "pageinfo": {
    "code": "tabboard",
    "title": "tabboard"
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
                  "handler": "handle-get"
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
                  "handler": "handle-set"
                }
              ],
              "style": {
                "margin": "10px"
              }
            },
            {
              "type": "button",
              "value": "切换readonly",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-toggle-readonly"
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
                  "handler": "handle-validata"
                }
              ],
              "style": {
                "margin": "10px"
              }
            }
          ]
        },
        {
          "type": "tabboard",
          "name": "tabboard框架",
          "title": "基本信息",
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
                          "handler": "handle-test"
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
                      "handler": "handle-save"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      "eventlist": []
    },
    "subviews": []
  },
  "presenter": {
    "initial": [],
    "interface": [],
    "handlers": [
      {
        "code": "handle-test",
        "title": "测试",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              page.getCtrl('确认密码').value = '1'
              // page.getCtrl('tabboard框架').hidden = true
            `
          }
        ]
      },
      {
        "code": "handle-save",
        "title": "修改密码",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              console.log(page)
              // page.getCtrl('新密码').value = '1'
            `
          }
        ]
      }
    ]
  }
}
