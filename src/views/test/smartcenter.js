/* eslint-disable */
export default {
  "pageinfo": {
    "code": "smartcenter",
    "title": "smartcenter"
  },
  "view": {
    "body": {
      "type": "layout",
      "flexdirection": "vertical",
      "flex": "1",
      "content": [
        {
          "type": "filter",
          "name": "查询栏",
          "title": "查询栏",
          "searchcondition": {
            "basic": [
              {
                "type": "dropdownbox",
                "title": "查询-租户类型",
                "name": "查询-租户类型",
                "placeholder": "租户类型",
                "required": "",
                "value": "1",
                "hidden": "",
                "options": [
                  {
                    "key": "1",
                    "text": "企业",
                    "isselected": "0"
                  },
                  {
                    "key": "0",
                    "text": "产品开发",
                    "isselected": "0"
                  }
                ],
                "hiddenclearbtn": "1",
                "eventlist": []
              },
              {
                "type": "filtertextinput",
                "title": "查询-企业编码",
                "name": "查询-企业编码",
                "placeholder": "企业编码",
                "eventlist": []
              }
            ],
            "advanced": []
          },
          "eventlist": [
            {
              "trigger": "onvaluechange",
              "handler": "1402930156032626778"
            }
          ]
        },
        {
          "type": "layout",
          "flexdirection": "horizontal",
          "flex": "",
          "style": {
            "backgroundColor": "#f60"
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
            }
          ]
        },
        {
          "type": "list",
          "title": "列表",
          "name": "列表",
          "checkable": "1",
          "pageable": "0",
          "pagesize": "20",
          "rows": {
            "type": "layout",
            "flexdirection": "vertical",
            "flex": "1",
            "content": [
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
                    "key": "1",
                    "text": "启用"
                  },
                  {
                    "key": "0",
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
            ]
          },
          "operations": [
            {
              "text": "新增(append)",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-new"
                }
              ]
            },
            {
              "text": "更新第一行数据(update)",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-update"
                }
              ]
            },
            {
              "text": "勾选第一行(setCheck)",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-setCheck"
                }
              ]
            },
            {
              "text": "获取第一行控件(getRow)",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-getRow"
                }
              ]
            },
            {
              "text": "删除(deleteInScope)",
              "readonly": "tableCheckedNumberIsEqualToZero",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-del"
                }
              ]
            },
            {
              "text": "打印勾选行数据(checkedIndex)",
              "readonly": "tableCheckedNumberIsNotEqualToOne",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-print"
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
              const value = page.getCtrl('列表').value
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
              page.getCtrl('列表').value = [
                {
                  productname: '可口可乐',
                  productcode: '001',
                  status: '1',
                  unit: 'box'
                },
                {
                  productname: '百事可乐',
                  productcode: '002',
                  status: '1',
                  unit: 'bottle'
                }
              ]
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
              page.getCtrl('列表').append({
                productname: '果粒橙',
                productcode: '003',
                status: '1',
                unit: 'bottle'
              })
            `
          }
        ]
      },
      {
        "code": "handle-update",
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
              page.getCtrl('列表').update({
                productname: '娃哈哈',
                productcode: '004',
                status: '0',
                unit: 'box'
              }, 0)
            `
          }
        ]
      },
      {
        "code": "handle-setCheck",
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
              page.getCtrl('列表').setCheck(true, 0)
            `
          }
        ]
      },
      {
        "code": "handle-del",
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
              page.getCtrl('列表').deleteInScope('checked')
            `
          }
        ]
      },
      {
        "code": "handle-print",
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
              const checkedValue = page.getCtrl('列表').checkedValue
              console.log(checkedValue)
            `
          }
        ]
      },
      {
        "code": "handle-getRow",
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
              const firstRow = page.getCtrl('列表').row[0]
              // const firstRow = page.getCtrl('列表').getRow(0)
              console.log(firstRow)
              firstRow.getCtrl('productname').value = 'xxxx'
              firstRow.getCtrl('unit').value = ''
              firstRow.getCtrl('unit').options = [
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
  }
}
