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
                        text: '可口可乐'
                      },
                      {
                        text: '百事可乐'
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
              "type": "link",
              "title": "link",
              "name": "link",
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
              "type": "text",
              "title": "text",
              "name": "text",
              "width": "100"
            },
            {
              "type": "select",
              "title": "select",
              "name": "select",
              "placeholder": "select",
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
            },
            {
              "type": "date",
              "title": "有效期",
              "name": "time",
              "required": "1",
              "format": "yyyy-MM-dd",
              "unit": "date",
              "width": "170",
              "eventlist": []
            },
            {
              "type": "tree",
              "titlewidth": "120",
              "title": "tree",
              "placeholder": "tree",
              "name": "tree",
              "multiselectable": "",
              "displaytype": "custom",
              // "displaytype": "navigation",
              "expandmodel": "rootexpand",
              "intermediateselectmode": "individual",
              "width": "150",
              "required": "",
              "value": "",
              "options": [
                {
                  "parentkey": "",
                  "key": "1",
                  "text": "巧克力公司",
                  "tags": [
                    {
                      "text": '标签',
                      "effect": 'dark',
                      "type": 'success'
                    },
                    {
                      "text": '标签',
                      "effect": 'light',
                      "type": 'success'
                    },
                    {
                      "text": '标签',
                      "effect": 'plain',
                      "type": 'success'
                    }
                  ]
                },
                {
                  "parentkey": "1",
                  "key": "1-1",
                  "text": "西南大区"
                },
                {
                  "parentkey": "1-1",
                  "key": "1-1-1",
                  "text": "张三"
                },
                {
                  "parentkey": "1-1",
                  "key": "1-1-2",
                  "text": "李四"
                },
                {
                  "parentkey": "1-1",
                  "key": "1-1-3",
                  "text": "王五"
                },
                {
                  "parentkey": "1",
                  "key": "1-2",
                  "text": "华北大区"
                },
                {
                  "parentkey": "1",
                  "key": "1-3",
                  "text": "华东大区"
                }
              ],
              "eventlist": [
                {
                  "trigger": "onvaluechange",
                  "handler": ""
                }
              ]
            },
            {
              "type": "textinput",
              "title": "产品编码",
              "name": "textinput",
              "width": "150",
              "eventlist": []
            },
            {
              "type": "tags",
              "title": "tags",
              "name": "tags",
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
                      link: '果粒橙',
                      textinput: '003',
                      tags: '1',
                      select: 'bottle'
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
                      link: '娃哈哈',
                      textinput: '004',
                      tags: '0',
                      select: 'box'
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
                    firstRow.getCtrl('link').value = 'xxxx'
                    firstRow.getCtrl('select').value = ''
                    firstRow.getCtrl('select').options = [
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
                    page.getCtrl('表格').getColByName('link').title = '产品名称'
                    page.getCtrl('表格').getColByName('select').readonly = true
                    page.getCtrl('表格').getColByName('select').required = false
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
