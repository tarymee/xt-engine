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
      "content": [
        {
          "type": "layout",
          "flexdirection": "horizontal",
          "flex": "",
          "style": {
            "backgroundColor": "#efefef"
          },
          "content": [
            {
              "type": "button",
              "value": "取值",
              "displaytype": "primary",
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
              "value": "测试",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-test"
                }
              ],
              "style": {
                "margin": "10px"
              }
            }
          ]
        },
        {
          "type": "layout",
          "flexdirection": "horizontal",
          "flex": "",
          "name": "layout",
          "style": {},
          "content": [
            {
              "type": "button",
              "code": "button-111",
              "value": "点点滴滴",
              "name": "点点滴滴",
              "displaytype": "primary",
              "eventlist": [],
              "style": {
                "margin": "10px"
              }
            }
          ]
        }
      ],
      "eventlist": []
    },
    "subviews": []
  },
  "presenter": {
    "initial": [
      {
        "code": "1454645626748",
        "title": "初始化",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `

            `
          }
        ]
      }
    ],
    "interface": [],
    "handlers": [
      {
        "code": "handle-get",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              // debugger
              const value = page.getCtrl('layout').getProp('content')
              console.log(value)
            `
          }
        ]
      },
      {
        "code": "handle-set",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              page.getCtrl('layout').setProp('content', [{
                type: 'button',
                code: "button-222",
                value: '插入按钮',
                name: '插入按钮'
              }])
              console.log(page.engine)
            `
          }
        ]
      },
      {
        "code": "handle-test",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              console.log(page.engine)
            `
          }
        ]
      },
      {
        "code": "handle-validata",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              const result = page.validata()
              console.log(result)
              if (!result) {
                throw Error('validata')
              }
            `
          }
        ]
      }
    ]
  }
}
