/* eslint-disable */
export default {
  "pageinfo": {
    "code": "foreach",
    "title": "foreach"
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
            "backgroundColor": "#f60"
          },
          "content": [
            {
              "type": "button",
              "value": "setValue",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "code": 'handle-setvalue'
                }
              ],
              "style": {
                "margin": "10px"
              }
            },
            {
              "type": "button",
              "value": "getValue",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    // debugger
                    const value = page.getCtrl('循环控件').value
                    const focusedValue = page.getCtrl('循环控件').focusedValue
                    console.log('all', value)
                    console.log('focused', focusedValue)
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
                    // debugger
                    page.getCtrl('循环控件').deleteInScope('all')
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
                    page.getCtrl('循环控件').append({
                      buttonname: 'buttonname5',
                      name: 'name5',
                      img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
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
                    page.getCtrl('循环控件').update(
                      [
                        {
                          buttonname: 'buttonname5',
                          name: 'name5',
                          img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
                        },
                        {
                          buttonname: 'buttonname5',
                          name: 'name5',
                          img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
                        }
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
                    const firstRow = page.getCtrl('循环控件').getRowByIndex(0)
                    console.log(firstRow)
                    firstRow.getCtrl('buttonname').setProp('value', 'ssss')
                    firstRow.getCtrl('buttonname').setProp('size', 'mini')

                    const allRow = page.getCtrl('循环控件').row
                    console.log(allRow)
                    allRow.forEach((item) => {
                      item.getCtrl('buttonname').setProp('value', 'ssss')
                      item.getCtrl('name').value = 'sss'
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
              "value": "validata",
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
          "type": "foreach",
          "title": "循环控件",
          "name": "循环控件",
          "flex": "",
          // "flexdirection": "vertical",
          "style": {
            // "height": "500px",
            // "width": "500px"
          },
          "rows": {
            "type": "layout",
            "style": {
              "margin": "8px 0 0 8px"
            },
            "content": [
              {
                "type": "button",
                "value": "按钮",
                "name": "buttonname",
                "style": {},
                "eventlist": [
                  {
                    "trigger": "onclicked",
                    "script": `
                      console.log(eventTarget)
                      // debugger
                      const value = page.getCtrl('循环控件').value
                      const focusedValue = page.getCtrl('循环控件').focusedValue
                      const index = page.getCtrl('循环控件').index
                      const focusedIndex = page.getCtrl('循环控件').focusedIndex
                      console.log('all', value)
                      console.log('focused', focusedValue)
                      console.log('index', index)
                      console.log('focusedIndex', focusedIndex)


                      // page.getCtrl('循环控件').deleteInScope('focused')
                    `
                  }
                ]
              },
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
                "type": "textinput",
                "title": "名称",
                "name": "name",
                "value": "名称",
                "eventlist": []
              },
              {
                "type": "text",
                "title": "其他",
                "name": "",
                "value": "其他描述无name",
                "eventlist": []
              }
            ]
          },
          "eventlist": [
            {
              "trigger": "onload",
              "handler": "handle-setvalue"
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
              page.getCtrl('循环控件').value = [
                {
                  buttonname: 'buttonname1',
                  name: 'name1',
                  img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                  // 支持设置某个控件的其他属性
                  __$$buttonname: {
                    round: '1',
                    title: 'xxxx',
                    size: 'big'
                  }
                },
                {
                  buttonname: 'buttonname2',
                  name: 'name2',
                  img: 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
                },
                {
                  buttonname: 'buttonname3',
                  name: 'name3',
                  img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
                },
                {
                  buttonname: 'buttonname4',
                  name: 'name4',
                  img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
                }
              ]
            `
          }
        ]
      }
    ]
  }
}
