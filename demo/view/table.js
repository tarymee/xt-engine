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
              "value": "rowoperations 状态更改",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    const a = page.getCtrl('表格').getProp('rowoperationshidden')
                    page.getCtrl('表格').setProp('rowoperationshidden', !a)

                    page.getCtrl('表格').setProp('rowoperationstitle', '操作栏更改文字')
                    page.getCtrl('表格').setProp('rowoperationswidth', 300)
                  `
                }
              ],
              "style": {
                "margin": "10px"
              }
            },
            {
              "type": "button",
              "value": "operations 状态更改",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    const a = page.getCtrl('表格').getProp('operationshidden')
                    page.getCtrl('表格').setProp('operationshidden', !a)
                  `
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
              "type": "tree",
              "titlewidth": "120",
              "title": "treemul",
              "placeholder": "treemul",
              "name": "treemul",
              "multiselectable": "1",
              "displaytype": "custom",
              // "displaytype": "navigation",
              "expandmodel": "rootexpand",
              "intermediateselectmode": "shortcut",
              "width": "150",
              "required": "",
              "value": "",
              "options": [
                {
                  "parentkey": "",
                  "key": "1",
                  "text": "巧克力公司"
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
              "type": "cascade",
              "titlewidth": "120",
              "title": "cascade",
              "placeholder": "cascade",
              "name": "cascade",
              "width": "150",
              "required": "",
              "value": "",
              "options": [
                {
                  "parentid": "",
                  "key": "1",
                  "text": "巧克力公司"
                },
                {
                  "parentid": "1",
                  "key": "1-1",
                  "text": "西南大区"
                },
                {
                  "parentid": "1-1",
                  "key": "1-1-1",
                  "text": "张三"
                },
                {
                  "parentid": "1-1",
                  "key": "1-1-2",
                  "text": "李四"
                },
                {
                  "parentid": "1-1",
                  "key": "1-1-3",
                  "text": "王五"
                },
                {
                  "parentid": "1",
                  "key": "1-2",
                  "text": "华北大区"
                },
                {
                  "parentid": "1",
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
              "type": "checkbox",
              "titlewidth": "120",
              "title": "checkbox",
              "placeholder": "checkbox",
              "name": "checkbox",
              "displaytype": "",
              "width": "200",
              "required": "",
              "value": "",
              "options": [
                {
                  "key": "1",
                  "disabled": "1",
                  "text": "启用"
                },
                {
                  "key": "0",
                  "disabled": "",
                  "text": "停用"
                },
                {
                  "key": true,
                  "disabled": "",
                  "text": "true"
                },
                {
                  "key": false,
                  "disabled": "",
                  "text": "false"
                },
                {
                  "key": 1,
                  "disabled": "",
                  "text": "数字1"
                },
                {
                  "key": 2,
                  "disabled": "",
                  "text": "数字2"
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
              "type": "radio",
              "titlewidth": "120",
              "title": "radio",
              "placeholder": "radio",
              "name": "radio",
              "displaytype": "",
              "width": "150",
              "required": "",
              // "value": "",
              "value": true,
              // "value": 1,
              "options": [
                {
                  "key": "1",
                  "disabled": "1",
                  "text": "启用"
                },
                {
                  "key": "0",
                  "disabled": "",
                  "text": "停用"
                },
                {
                  "key": true,
                  "disabled": "",
                  "text": "true"
                },
                {
                  "key": false,
                  "disabled": "",
                  "text": "false"
                },
                {
                  "key": 1,
                  "disabled": "",
                  "text": "数字1"
                },
                {
                  "key": 2,
                  "disabled": "",
                  "text": "数字2"
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
              "type": "attachment",
              "titlewidth": "120",
              "title": "attachment",
              "placeholder": "attachment",
              "name": "attachment",
              "hidefile": "",
              "uploadtype": "",
              "uploadtext": "",
              "uploadicon": "",
              "name": "attachment",
              "width": "250",
              "required": "",
              "maxnumber": "2",
              "maxsize": "1048576",
              "accept": "image/*",
              "eventlist": [
                {
                  "trigger": "onvaluechange",
                  "handler": ""
                },
                {
                  "trigger": "onupload",
                  "script": `
                    console.log(eventTarget)
                    console.log(eventTarget.selectFile)

                    eventTarget.handleSuccess({
                      filename: eventTarget.selectFile.filename,
                      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                    })
                  `
                }
              ]
            },
            {
              "type": "photo",
              "titlewidth": "120",
              "title": "photo",
              "placeholder": "photo",
              "name": "photo",
              "width": "250",
              "required": "",
              "maxnumber": "2",
              "maxsize": "1048576",
              "accept": "image/*",
              "eventlist": [
                {
                  "trigger": "onvaluechange",
                  "handler": ""
                },
                {
                  "trigger": "onupload",
                  "script": `
                    console.log(eventTarget)
                    console.log(eventTarget.selectFile)

                    eventTarget.handleSuccess({
                      filename: eventTarget.selectFile.filename,
                      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                    })
                  `
                }
              ]
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
                    console.log(firstRow.getCtrl('select'))
                    firstRow.getCtrl('link').value = 'xxxx'
                    firstRow.getCtrl('select').value = ''
                    firstRow.getCtrl('select').readonly = !firstRow.getCtrl('select').readonly
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
          "operationshidden": "",
          "rowoperations": [
            {
              "text": "编辑编辑编辑编辑",
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
              "text": "删除删除删除删除",
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
          "rowoperationshidden": "",
          "rowoperationstitle": "",
          "rowoperationswidth": "",
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
