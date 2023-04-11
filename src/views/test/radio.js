/* eslint-disable */
export default {
  "pageinfo": {
    "code": "radio",
    "title": "radio"
  },
  "view": {
    "body": {
      "type": "layout",
    
      "flexdirection": "vertical",
      "flex": "1",
      "hidden": "",
      "style": {
        "width": "800px",
        "margin": "30px auto"
      },
      "content": [
        {
          "type": "radio",
          "titlewidth": "70",
          "title": "单选",
          "placeholder": "",
          "displaytype": "3",
          "name": "单选",
          "width": "100%",
          "required": "1",
          "hidden": "",
          "readonly": "",
          "value": "",
          "options": [
            {
              "key": "1",
              "disabled": "1",
              "text": "启用启用启用启用启用"
            },
            {
              "key": "0",
              "disabled": "",
              "text": "停用停用停用停用停用"
            },
            {
              "key": "3",
              "disabled": "1",
              "text": "停用3停用3停用3停用3停用3"
            },
            {
              "key": "4",
              "disabled": "1",
              "text": "停用4停用4停用4停用4停用4"
            },
            {
              "key": "5",
              "disabled": "1",
              "text": "停用5停用5停用5停用5停用5"
            },
            {
              "key": "6",
              "disabled": "1",
              "text": "停用6停用6停用6停用6停用6"
            }
          ],
          "eventlist": [
            {
              "trigger": "onvaluechange",
              "handler": "handle-valuechange"
            },
            {
              "trigger": "onload",
              "handler": ""
            }
          ]
        },
        {
          "type": "textinput",
          "titlewidth": "70",
          "title": "测试",
          "placeholder": "测试",
          "value": "测试\nsdd测试d",
          "name": "测试",
          "displaytype": "textarea",
          "width": "100%",
          "required": "",
          "minrow": "2",
          "maxrow": "20",
          "readonly": "",
          "eventlist": []
        },
        {
          "type": "checkbox",
          "titlewidth": "70",
          "title": "多选",
          "placeholder": "",
          "displaytype": "auto",
          "name": "多选",
          "hidden": "",
          "width": "100%",
          "required": "1",
          "readonly": "",
          "value": "",
          "options": [
            {
              "key": "1",
              "disabled": "1",
              "text": "启用启用启用启用启用"
            },
            {
              "key": "0",
              "disabled": "",
              "text": "停用停用停用停用停用"
            },
            {
              "key": "3",
              "disabled": "1",
              "text": "停用3停用3停用3停用3停用3"
            },
            {
              "key": "4",
              "disabled": "1",
              "text": "停用4停用4停用4停用4停用4"
            },
            {
              "key": "5",
              "disabled": "1",
              "text": "停用5停用5停用5停用5停用5"
            },
            {
              "key": "6",
              "disabled": "1",
              "text": "停用6停用6停用6停用6停用6"
            }
          ],
          "eventlist": [
            {
              "trigger": "onvaluechange",
              "handler": "handle-valuechange"
            },
            {
              "trigger": "onload",
              "handler": ""
            }
          ]
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
              "title": "取值",
              "value": "取值",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-get"
                }
              ]
            },
            {
              "type": "button",
              "title": "赋值",
              "value": "赋值",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-set"
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
        "code": "handle-valuechange",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              console.log(eventTarget)
              console.log('onvaluechange')
              console.log(page.getCtrl('单选').value)
              console.log(page.getCtrl('多选').value)
            `
          }
        ]
      },
      {
        "code": "handle-onload",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              // const file = page.getCtrl('文件')
              // console.log(file)
              // console.log(eventTarget)

            `
          }
        ]
      },
      {
        "code": "handle-get",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              if (!page.validata()) {
                throw Error('validata')
              }
              console.log(page.getCtrl('单选').value)
              console.log(page.getCtrl('多选').value)
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
              page.getCtrl('单选').value = '0'
              page.getCtrl('多选').value = ['1']
            `
          }
        ]
      }
    ]
  }
}
