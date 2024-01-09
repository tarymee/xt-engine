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
            "backgroundColor": "#eee"
          },
          "content": [
            {
              "type": "button",
              "value": "取值",
              "displaytype": "primary",
              "plain": "1",
              // "class": "xxx",
              "css": `
                // .xxx.xt-button {
                //   width: 100%
                // }
              `,
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
          "type": "table",
          "title": "表格",
          "name": "表格",
          "checkable": "1",
          "pageable": "0",
          "pagesize": "20",
          "fixednumber": "1",
          "columns": [
            {
              "type": "dropdownbox",
              "title": "单位",
              "name": "unit",
              "placeholder": "选择单位",
              "required": "1",
              "width": "120",
              "hiddenclearbtn": "",
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
            },
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
              "type": "textinput",
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
            }
          ],
          "operations": [
            {
              "text": "append",
              "name": "add",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-new"
                }
              ]
            },
            {
              "text": "update",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-update"
                }
              ]
            },
            {
              "text": "setCheck",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-setCheck"
                }
              ]
            },
            {
              "text": "getRowByIndex",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-getRowByIndex"
                }
              ]
            },
            {
              "text": "getColByName",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-getColByName"
                }
              ]
            },
            {
              "text": "getOperationCtrl",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-getOperationCtrl"
                }
              ]
            },
            {
              "text": "getRowoperationsCtrl",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-getRowoperationsCtrl"
                }
              ]
            },
            {
              "text": "deleteInScope",
              "readonly": "tableCheckedNumberIsEqualToZero",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-deleteInScope"
                }
              ]
            },
            {
              "text": "checkedValue",
              "readonly": "tableCheckedNumberIsNotEqualToOne",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-checkedValue"
                }
              ]
            }
          ],
          "rowoperations": [
            {
              "text": "编辑",
              "name": "edit",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-edit"
                }
              ]
            },
            {
              "text": "删除",
              "name": "del",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-del"
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
        "code": "handle-edit",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              const value = page.getCtrl('表格').focusedValue
              console.log(value)
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
              const value = page.getCtrl('表格').focusedValue
              console.log(value)
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
        "code": "handle-deleteInScope",
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
        "code": "handle-checkedValue",
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
        "code": "handle-getRowByIndex",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              const firstRow = page.getCtrl('表格').row[0]
              // const firstRow = page.getCtrl('表格').getRowByIndex(0)
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
        "code": "handle-getColByName",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              page.getCtrl('表格').getColByName('productname').title = '产品名称'
              page.getCtrl('表格').getColByName('unit').readonly = true
              page.getCtrl('表格').getColByName('unit').required = false
            `
          }
        ]
      },
      {
        "code": "handle-getOperationCtrl",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              const ctrl = page.getCtrl('表格').getOperationCtrl('add')
              console.log(ctrl)
              ctrl.hidden = true
            `
          }
        ]
      },
      {
        "code": "handle-getRowoperationsCtrl",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              const ctrls = page.getCtrl('表格').getRowoperationsCtrl('edit')
              console.log(ctrls)
            `
          }
        ]
      },
      {
        "code": "handle-toggle-readonly",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              page.getCtrl('表格').readonly = !page.getCtrl('表格').readonly
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
