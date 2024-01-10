/* eslint-disable */
export default {
  "pageinfo": {
    "code": "test",
    "title": "test"
  },
  "view": {
    "body": {
      "type": "layout",
      "flex": "1",
      "content": [
        {
          "type": "layout",
          "flexdirection": "horizontal",
          "style": {
            "backgroundColor": "#efefef"
          },
          "content": [
            {
              "type": "button",
              "value": "弹窗1",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    page.getCtrl('弹窗1').hidden = false
                    page.getCtrl('弹窗1').value = '1'
                  `
                }
              ],
              "style": {
                "margin": "10px 5px"
              }
            },
            {
              "type": "button",
              "value": "弹窗2",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    page.getCtrl('弹窗2').hidden = false
                  `
                }
              ],
              "style": {
                "margin": "10px 5px"
              }
            }
          ]
        }
      ],
      "eventlist": []
    },
    "subviews": [
      {
        "type": "popview",
        "title": "弹窗1",
        "name": "弹窗1",
        "wrapwidth": "1000",
        "height": "500",
        "fullscreen": "",
        "content": [
          {
            "type": "textinput",
            "title": "textinput"
          },
          {
            "type": "button",
            "value": "button",
            "eventlist": [
              {
                "trigger": "onclicked",
                "script": `
                    console.log(page.getCtrl('弹窗1').value)
                  `
              }
            ]
          },
        ],
        "operations": [
          {
            "type": "button",
            "text": "确 定",
            "name": "确定",
            "eventlist": [
              {
                "trigger": "onclicked",
                "script": `page.getCtrl('确定').readonly = true`
              }
            ]
          },
          {
            "type": "button",
            "text": "取消",
            "eventlist": [
              {
                "trigger": "onclicked",
                "handler": ""
              }
            ]
          },
          {
            "type": "button",
            "text": "其他按钮1",
            "eventlist": [
              {
                "trigger": "onclicked",
                "handler": ""
              }
            ]
          },
          {
            "type": "button",
            "text": "其他按钮2",
            "eventlist": [
              {
                "trigger": "onclicked",
                "handler": ""
              }
            ]
          }
        ],
        "eventlist": []
      },
      {
        "type": "popview",
        "title": "弹窗2",
        "name": "弹窗2",
        "wrapwidth": "1000",
        "height": "",
        "fullscreen": "1",
        "content": [
          {
            "type": "button",
            "value": "button",
            "eventlist": [
              {
                "trigger": "onclicked",
                "script": `
                    console.log('')
                  `
              }
            ]
          },
        ],
        "eventlist": []
      }
    ]
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
        "code": "handle-test",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "script": `
              console.log('test')
            `
          }
        ]
      }
    ]
  }
}
