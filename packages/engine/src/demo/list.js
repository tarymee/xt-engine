/* eslint-disable */
export default {
  "pageinfo": {
    "code": "list",
    "title": "list"
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
                "type": "select",
                "title": "查询-租户类型",
                "name": "查询-租户类型",
                "placeholder": "租户类型",
                "required": "",
                "value": "1",
                "hidden": "",
                "options": [
                  {
                    "key": "1",
                    "text": "企业"
                  },
                  {
                    "key": "0",
                    "text": "产品开发"
                  }
                ],
                "hiddenclearbtn": "1",
                "eventlist": []
              },
              {
                "type": "textinput",
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
              "handler": ""
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
                  "script": `
                    const value = page.getCtrl('列表').value
                    const checkedValue = page.getCtrl('列表').checkedValue
                    const focusedValue = page.getCtrl('列表').focusedValue
                    console.log('all', value)
                    console.log('checkedValue', checkedValue)
                    console.log('focusedValue', focusedValue)
                  `
                }
              ],
              "style": {
                "margin": "10px"
              }
            },
            {
              "type": "button",
              "value": "勾选",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    page.getCtrl('列表').setCheck(true, 0)
                  `
                }
              ],
              "style": {
                "margin": "10px"
              }
            },
            {
              "type": "button",
              "value": "deleteInScope",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    page.getCtrl('列表').deleteInScope('all')
                  `
                }
              ],
              "style": {
                "margin": "10px"
              }
            },
            {
              "type": "button",
              "value": "append",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    page.getCtrl('列表').append({
                      name: '',
                      des: '',
                      number: '1',
                      img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                    })
                  `
                }
              ],
              "style": {
                "margin": "10px"
              }
            },
            {
              "type": "button",
              "value": "update",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    page.getCtrl('列表').update(
                      [
                        {
                          name: 'zzz',
                          des: 'zzzz',
                          number: '111',
                          img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                        },
                        {}
                      ],
                      [0, 2]
                    )
                  `
                }
              ],
              "style": {
                "margin": "10px"
              }
            },
            {
              "type": "button",
              "value": "getRowByIndex",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    const firstRow = page.getCtrl('列表').getRowByIndex(0)
                    console.log(firstRow)
                    firstRow.getCtrl('name').setProp('value', 'ssss')
                    firstRow.getCtrl('button').setProp('size', 'mini')
                    firstRow.getCtrl('number').value = '888'

                    const allRow = page.getCtrl('列表').row
                    console.log(allRow)
                    allRow.forEach((item) => {
                      item.getCtrl('name').setProp('value', 'ssss')
                    })
                  `
                }
              ],
              "style": {
                "margin": "10px"
              }
            },
            {
              "type": "button",
              "value": "全局校验",
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
          "type": "list",
          "title": "列表",
          "name": "列表",
          "checkable": "1",
          "pageable": "0",
          "pagesize": "20",
          "flex": "1",
          "style": {
            // "height": "500px",
            // "width": "500px"
          },
          "rowswidth": "25%",
          "rowsstyle": "card",
          // "rowsstyle": "",
          "rows": {
            "type": "layout",
            "flexdirection": "vertical",
            "style": {
              "padding": "16px"
              // "border": "1px solid #ccc",
              // "borderRadius": "3px",
              // "box-shadow": "0px 0px 5px #ddd",
              // "margin": "8px"
            },
            "content": [
              {
                "type": "image",
                "title": "图片",
                "name": "img",
                "value": "",
                "style": {
                  "width": "100%",
                  "height": "200px"
                },
                "eventlist": []
              },
              {
                "type": "text",
                "title": "名称",
                "name": "name",
                "value": "名称",
                "style": {
                  "fontWeight": "bold",
                  "fontSize": "16px",
                  "margin-top": "8px",
                  "margin-bottom": "4px"
                },
                "eventlist": []
              },
              {
                "type": "text",
                "title": "描述",
                "name": "des",
                "value": "描述",
                "style": {
                  "overflow": "hidden",
                  "text-overflow": "ellipsis",
                  "display": "-webkit-box",
                  "-webkit-line-clamp": 2,
                  "-webkit-box-orient": "vertical",
                  "color": "#777",
                  "fontSize": "12px"
                },
                "eventlist": []
              },
              {
                "type": "textinput",
                "title": "数量",
                "name": "number",
                "value": "",
                "style": {},
                "eventlist": []
              },
              {
                "type": "button",
                "value": "button",
                "name": "button",
                "displaytype": "primary",
                "eventlist": [
                  {
                    "trigger": "onclicked",
                    "script": `
                      page.getCtrl('列表').deleteInScope('focused')
                    `
                  }
                ]
              },
            ]
          },
          "frontoperations": [
            {
              "type": "layout",
              "flex": "1",
              "style": {
                "backgroundColor": "",
                "justify-content": "center",
                "align-items": "center",
                "flex-direction": "column",
                "min-height": "160px"
              },
              "content": [
                {
                  "type": "text",
                  "title": "",
                  "name": "",
                  "value": "✚",
                  "hidden": "",
                  "style": {
                    "font-size": "50px",
                    "color": "#f60"
                  }
                }
              ],
              "eventlist": [
                {
                  "trigger": "onclicked",
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
            }
          ],
          "operations": [],
          "rowoperations": [
            {
              "text": "编辑",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    const focusedValue = page.getCtrl('列表').focusedValue
                    console.log('focusedValue', focusedValue)
                  `
                }
              ]
            },
            // {
            //   "text": "新增",
            //   "eventlist": [
            //     {
            //       "trigger": "onclicked",
            //       "script": ``
            //     }
            //   ]
            // }
          ],
          "eventlist": [
            {
              "trigger": "onload",
              "handler": "handle-setvalue"
            },
            {
              "trigger": "onchecked",
              "handler": `
                const checkedValue = page.getCtrl('列表').checkedValue
                console.log('checkedValue', checkedValue)
              `
            }
          ]
        }
      ],
      "eventlist": []
    },
    "subviews": []
  },
  "presenter": {
    "initial": [],
    "interface": [],
    "handlers": [
      {
        "code": "handle-setvalue",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              page.getCtrl('列表').value = [
                {
                  name: '',
                  des: '',
                  number: '1',
                  img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                },
                {
                  name: '电子协议SPU电子协议SPU电子协议SPU电子协议SPU电子协议SPU',
                  des: '电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述',
                  number: '',
                  img: 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
                },
                {
                  name: '电子协议SPU',
                  // des: '电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述',
                  number: '',
                  img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
                },
                {
                  name: '电子协议SPU',
                  des: '电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述',
                  number: '1',
                  img: ''
                }
              ]
            `
          }
        ]
      }
    ]
  }
}
