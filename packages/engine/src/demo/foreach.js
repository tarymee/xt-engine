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
                  "script": `
                    page.getCtrl('循环控件').value = [
                      {
                        name: 'name1',
                        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                      },
                      {
                        name: 'name2',
                        img: 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
                      },
                      {
                        name: 'name3',
                        img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
                      },
                      {
                        name: 'name4',
                        img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
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
              "value": "getValue",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    // debugger
                    const value = page.getCtrl('循环控件').value
                    const checkedValue = page.getCtrl('循环控件').checkedValue
                    console.log('all', value)
                    console.log('checked', checkedValue)
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
                "name": "",
                "style": {},
                "eventlist": []
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
              }
            ]
          },
          "eventlist": [
            {
              "trigger": "onload",
              "handler": "handle-onload"
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
    "handlers": []
  }
}
