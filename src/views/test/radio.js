/* eslint-disable */
export default {
  "pageinfo": {
    "code": "radio",
    "title": "radio",
    "pagedescr": "radio"
  },
  "view": {
    "body": {
      "type": "layout",
      "code": "layout-8161770481264333",
      "flexdirection": "vertical",
      "flex": "1",
      "hidden": "",
      "style": {
        "width": "400px",
        "margin": "30px auto"
      },
      "content": [
        {
          "type": "radio",
          "titlewidth": "70",
          "title": "单选",
          "placeholder": "",
          "displaytype": "vertical",
          "name": "单选",
          "width": "100%",
          "required": "1",
          "hidden": "",
          "readonly": "",
          "value": "",
          "options": [
            {
              "key": "1",
              "text": "启用"
            },
            {
              "key": "0",
              "text": "停用"
            },
            {
              "key": "3",
              "text": "停用3"
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
          "name": "测试",
          "displaytype": "",
          "width": "100%",
          "required": "",
          "eventlist": []
        },
        {
          "type": "checkbox",
          "titlewidth": "70",
          "title": "多选",
          "placeholder": "",
          "displaytype": "vertical",
          "name": "多选",
          "hidden": "",
          "width": "100%",
          "required": "1",
          "readonly": "",
          "value": "",
          "options": [
            {
              "key": "1",
              "text": "启用"
            },
            {
              "key": "0",
              "text": "停用"
            },
            {
              "key": "3",
              "text": "停用3"
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
          "code": "layout-8166354650481264333",
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
        "desc": "初始化",
        "name": "",
        "successhint": "",
        "notice": "",
        "key": "",
        "condition": "",
        "remark": "",
        "actions": [
          {
            "code": "1402930156032626747",
            "type": "flycode",
            "desc": "flycode",
            "condition": "",
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
        "desc": "",
        "name": "",
        "successhint": "",
        "notice": "",
        "key": "",
        "condition": "",
        "remark": "",
        "actions": [
          {
            "code": "1402930156032626777",
            "type": "flycode",
            "desc": "flycode",
            "condition": "",
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
        "desc": "",
        "name": "",
        "successhint": "",
        "notice": "",
        "key": "",
        "condition": "",
        "remark": "",
        "actions": [
          {
            "code": "1402930156032626777",
            "type": "flycode",
            "desc": "flycode",
            "condition": "",
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
        "desc": "",
        "name": "",
        "successhint": "",
        "notice": "",
        "key": "",
        "condition": "",
        "remark": "",
        "actions": [
          {
            "code": "1402930156032626777",
            "type": "flycode",
            "desc": "flycode",
            "condition": "",
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
        "desc": "",
        "name": "",
        "successhint": "",
        "notice": "",
        "key": "",
        "condition": "",
        "remark": "",
        "actions": [
          {
            "code": "1402930156032626777",
            "type": "flycode",
            "desc": "flycode",
            "condition": "",
            "script": `
              page.getCtrl('单选').value = '0'
              page.getCtrl('多选').value = []
            `
          }
        ]
      }
    ]
  },
  "businessmodel": []
}
