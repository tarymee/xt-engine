/* eslint-disable */
export default {
  "pageinfo": {
    "code": "table",
    "title": "table"
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
            "backgroundColor": "#eee"
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
          ],
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
          "rowoperations": [
            {
              "text": "编辑",
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
              const value = page.getCtrl('表格').value
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
              page.getCtrl('表格').value = [
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
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              page.getCtrl('表格').append({
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
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              page.getCtrl('表格').update({
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
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              page.getCtrl('表格').setCheck(true, 0)
            `
          }
        ]
      },
      {
        "code": "handle-del",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              page.getCtrl('表格').deleteInScope('checked')
            `
          }
        ]
      },
      {
        "code": "handle-print",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              const checkedValue = page.getCtrl('表格').checkedValue
              console.log(checkedValue)
            `
          }
        ]
      },
      {
        "code": "handle-getRow",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              const firstRow = page.getCtrl('表格').row[0]
              // const firstRow = page.getCtrl('表格').getRow(0)
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
