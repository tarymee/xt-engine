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
          "pageable": "1",
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
              // "border": "1px solid #ccc",
              // "borderRadius": "3px",
              // "box-shadow": "0px 0px 5px #ddd",
              // "padding": "16px",
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
              // {
              //   "type": "textinput",
              //   "title": "数量",
              //   "name": "number",
              //   "value": "",
              //   "style": {},
              //   "eventlist": []
              // }
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
                  "handler": "handle-update"
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
                  "handler": "handle-edit"
                }
              ]
            },
            // {
            //   "text": "新增",
            //   "eventlist": [
            //     {
            //       "trigger": "onclicked",
            //       "handler": "handle-edit"
            //     }
            //   ]
            // },
            // {
            //   "text": "启用",
            //   "eventlist": [
            //     {
            //       "trigger": "onclicked",
            //       "handler": "handle-edit"
            //     }
            //   ]
            // },
            // {
            //   "text": "停用",
            //   "eventlist": [
            //     {
            //       "trigger": "onclicked",
            //       "handler": "handle-edit"
            //     }
            //   ]
            // }
          ],
          "eventlist": [
            {
              "trigger": "onload",
              "handler": "handle-onload"
            },
            {
              "trigger": "onchecked",
              "handler": "handle-onchecked"
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
              const checkedValue = page.getCtrl('列表').checkedValue
              console.log('all', value)
              console.log('checked', checkedValue)
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
              // return false
              page.getCtrl('列表').value = [
                {
                  name: '',
                  des: '',
                  img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                },
                {
                  name: '电子协议SPU',
                  des: '电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述',
                  img: 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
                },
                {
                  name: '电子协议SPU',
                  // des: '电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述',
                  img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
                },
                {
                  name: '电子协议SPU',
                  des: '电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述',
                  img: ''
                },
                // {
                //   name: '电子协议SPU',
                //   des: '电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述',
                //   img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
                // },
                // {
                //   name: '电子协议SPU',
                //   des: '电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述',
                //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                // },
                // {
                //   name: '电子协议SPU',
                //   des: '电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述',
                //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                // },
                // {
                //   name: '电子协议SPU',
                //   des: '电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述',
                //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                // },
                // {
                //   name: '电子协议SPU',
                //   des: '电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述',
                //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                // },
                // {
                //   name: '电子协议SPU',
                //   des: '电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述',
                //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                // },
                // {
                //   name: '电子协议SPU',
                //   des: '电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述',
                //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                // },
                // {
                //   name: '电子协议SPU',
                //   des: '电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述',
                //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                // },
                // {
                //   name: '电子协议SPU',
                //   des: '电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述电子协议SPU描述',
                //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                // }
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
