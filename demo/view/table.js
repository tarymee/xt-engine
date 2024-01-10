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
                  "script": `
                    const value = page.getCtrl('表格').value
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
                  "script": `page.getCtrl('表格').readonly = !page.getCtrl('表格').readonly`
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
                    const result = page.validata()
                    console.log(result)
                    if (!result) {
                      throw Error('validata')
                    }
                  `
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
                  "script": `
                    const value = page.getCtrl('表格').focusedValue
                    console.log(value)
                  `
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
              "text": "update",
              "eventlist": [
                {
                  "trigger": "onclicked",
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
              "text": "setCheck",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    page.getCtrl('表格').setCheck(true, 0)
                  `
                }
              ]
            },
            {
              "text": "getRowByIndex",
              "eventlist": [
                {
                  "trigger": "onclicked",
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
              "text": "getColByName",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    page.getCtrl('表格').getColByName('productname').title = '产品名称'
                    page.getCtrl('表格').getColByName('unit').readonly = true
                    page.getCtrl('表格').getColByName('unit').required = false
                  `
                }
              ]
            },
            {
              "text": "getOperationCtrl",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    const ctrl = page.getCtrl('表格').getOperationCtrl('add')
                    console.log(ctrl)
                    ctrl.hidden = true
                  `
                }
              ]
            },
            {
              "text": "getRowoperationsCtrl",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    const ctrls = page.getCtrl('表格').getRowoperationsCtrl('edit')
                    console.log(ctrls)
                  `
                }
              ]
            },
            {
              "text": "deleteInScope",
              "readonly": "tableCheckedNumberIsEqualToZero",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    page.getCtrl('表格').deleteInScope('checked')
                  `
                }
              ]
            },
            {
              "text": "checkedValue",
              "readonly": "tableCheckedNumberIsNotEqualToOne",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    const checkedValue = page.getCtrl('表格').checkedValue
                    console.log(checkedValue)
                  `
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
                  "script": `
                    const value = page.getCtrl('表格').focusedValue
                    console.log(value)
                  `
                }
              ]
            },
            {
              "text": "删除",
              "name": "del",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    const value = page.getCtrl('表格').focusedValue
                    console.log(value)
                  `
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
    "handlers": []
  }
}
