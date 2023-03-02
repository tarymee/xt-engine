/* eslint-disable */
export default {
  "pageinfo": {
    "code": "table",
    "title": "table",
    "pagedescr": "table"
  },
  "view": {
    "body": {
      "type": "layout",
      "flexdirection": "vertical",
      "flex": "1",
      "hidden": "",
      "content": [
        {
          "type": "layout",
          "flexdirection": "horizontal",
          "justifyContent": "",
          "flex": "",
          "width": "",
          "hidden": "",
          "style": {
            "backgroundColor": "#eee"
          },
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
              ],
              "style": {
                "margin": "10px"
              }
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
              ],
              "style": {
                "margin": "10px"
              }
            }
          ]
        },
        {
          "type": "table",
          "title": "表格",
          "name": "表格",
          "checkable": "1",
          "pageable": "0",
          "pagesize": "20",
          "columns": [
            {
              "type": "link",
              "title": "产品",
              "name": "productname",
              "width": "150",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-edit"
                }
              ]
            },
            {
              "type": "text",
              "title": "产品编码",
              "name": "productcode",
              "width": "150",
              "eventlist": []
            },
            {
              "type": "tags",
              "title": "状态",
              "name": "status",
              "width": "80",
              "options": [
                {
                  "key": 1,
                  "text": "启用"
                },
                {
                  "key": 2,
                  "text": "停用"
                }
              ],
              "eventlist": []
            },
            {
              "type": "dropdownbox",
              "title": "单位",
              "name": "unit",
              "placeholder": "选择单位",
              "required": "1",
              "readonly": "",
              "value": "",
              "width": "120",
              "hiddenclearbtn": "1",
              "options": [
                {
                  "key": "bottle",
                  "text": "瓶"
                },
                {
                  "key": "box",
                  "text": "箱"
                }
              ],
              "eventlist": []
            }
          ],
          "operations": [
            {
              "text": "新增",
              "icon": "",
              "disabled": "",
              "functioncode": "",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-new"
                }
              ]
            },
            {
              "text": "getRows",
              "icon": "",
              "disabled": "",
              "functioncode": "",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-getRows"
                }
              ]
            },
            {
              "text": "单选多选可用",
              "icon": "",
              "readonly": "tableCheckedNumberIsEqualToZero",
              "hidden": "",
              "functioncode": "",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": ""
                }
              ]
            },
            {
              "text": "单选可用",
              "icon": "",
              "readonly": "tableCheckedNumberIsNotEqualToOne",
              "hidden": "",
              "functioncode": "",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": ""
                }
              ]
            }
          ],
          "rowoperations": [
            {
              "text": "编辑",
              "icon": "",
              "disabled": "",
              "functioncode": "",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-edit"
                }
              ]
            }
          ],
          "eventlist": []
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
              const value = page.getCtrl('表格').value
              console.log(value)
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
              page.getCtrl('表格').value = []
            `
          }
        ]
      },
      {
        "code": "handle-new",
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
              page.getCtrl('表格').append([{}])
            `
          }
        ]
      },
      {
        "code": "handle-getRows",
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
              const ctrl = page.getCtrl('表格')
              console.log(ctrl.row)
              ctrl.row[0].getCtrl('productname').value = 'xxxx'
              ctrl.row[0].getCtrl('unit').options = [
                {
                  key: 'xx',
                  text: 'xx'
                }
              ]
            `
          }
        ]
      },
      {
        "code": "handle-validata",
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
  },
  "businessmodel": []
}
