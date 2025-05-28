/* eslint-disable */
export default {
  "pageinfo": {
    "code": "test",
    "title": "test"
  },
  "view": {
    "body": {
      "type": "layout",
      "flex": "1",
      "content": [
        {
          "type": "layout",
          "flexdirection": "horizontal",
          "style": {
            "backgroundColor": "#efefef"
          },
          "content": [
            {
              "type": "button",
              "value": "取值",
              "name": "取值",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    // debugger
                    const value = {
                      textinput: page.getCtrl('textinput').value,
                      select: page.getCtrl('select').value,
                      tree: page.getCtrl('tree').value,
                      treemul: page.getCtrl('treemul').value,
                      cascade: page.getCtrl('cascade').value,
                      date: page.getCtrl('date').value,
                      textarea: page.getCtrl('textarea').value,
                      checkbox: page.getCtrl('checkbox').value,
                      radio: page.getCtrl('radio').value,
                      attachment: page.getCtrl('attachment').value,
                      photo: page.getCtrl('photo').value,
                    }
                    console.log(value)
                  `
                }
              ],
              "style": {
                "margin": "10px 5px"
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
                    // page.getCtrl('textinput').value = 'textinputtextinputtextinputtextinputtextinputtextinputtextinputtextinputtextinputtextinputtextinputtextinputtextinputtextinputtextinputtextinputtextinputtextinputtextinputtextinputtextinputtextinputtextinputtextinputtextinputtextinput'
                    page.getCtrl('textinput').value = 'textinput'
                    page.getCtrl('select').value = '1'
                    page.getCtrl('tree').value = '1'
                    page.getCtrl('treemul').value = ['1-1-1', '1-1-2']
                    page.getCtrl('cascade').value = ['1', '1-1', '1-1-1']
                    page.getCtrl('date').value = '1681228800000'
                    page.getCtrl('textarea').value = 'textarea'
                    // page.getCtrl('textarea').value = 'textareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextareatextarea'
                    page.getCtrl('checkbox').value = ['0', true, 1]
                    page.getCtrl('radio').value = '0'
                    page.getCtrl('attachment').value = [
                      {
                        filename: '鸟',
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                      }
                    ]
                    page.getCtrl('photo').value = [
                      {
                        filename: '鸟',
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                      }
                    ]
                  `
                }
              ],
              "style": {
                "margin": "10px 5px"
              }
            },
            {
              "type": "button",
              "value": "切换只读",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    console.log('handle-readonly')
                    page.getCtrl('表单layout').readonly = !page.getCtrl('表单layout').readonly
                  `
                }
              ],
              "style": {
                "margin": "10px 5px"
              }
            },
            {
              "type": "button",
              "value": "切换必填",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    console.log('handle-required')
                    page.getCtrl('textinput').required = !page.getCtrl('textinput').required
                    page.getCtrl('select').required = !page.getCtrl('select').required
                    page.getCtrl('tree').required = !page.getCtrl('tree').required
                    page.getCtrl('treemul').required = !page.getCtrl('treemul').required
                    page.getCtrl('cascade').required = !page.getCtrl('cascade').required
                    page.getCtrl('date').required = !page.getCtrl('date').required
                    page.getCtrl('textarea').required = !page.getCtrl('textarea').required
                    page.getCtrl('checkbox').required = !page.getCtrl('checkbox').required
                    page.getCtrl('radio').required = !page.getCtrl('radio').required
                    page.getCtrl('attachment').required = !page.getCtrl('attachment').required
                    page.getCtrl('photo').required = !page.getCtrl('photo').required
                  `
                }
              ],
              "style": {
                "margin": "10px 5px"
              }
            },
            {
              "type": "button",
              "value": "切换文本显示",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    console.log('handle-textual')
                    page.getCtrl('textinput').textual = !page.getCtrl('textinput').textual
                    page.getCtrl('select').textual = !page.getCtrl('select').textual
                    page.getCtrl('tree').textual = !page.getCtrl('tree').textual
                    page.getCtrl('treemul').textual = !page.getCtrl('treemul').textual
                    page.getCtrl('cascade').textual = !page.getCtrl('cascade').textual
                    page.getCtrl('date').textual = !page.getCtrl('date').textual
                    page.getCtrl('textarea').textual = !page.getCtrl('textarea').textual
                    page.getCtrl('checkbox').textual = !page.getCtrl('checkbox').textual
                    page.getCtrl('radio').textual = !page.getCtrl('radio').textual
                    page.getCtrl('attachment').textual = !page.getCtrl('attachment').textual
                    page.getCtrl('photo').textual = !page.getCtrl('photo').textual
                  `
                }
              ],
              "style": {
                "margin": "10px 5px"
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
                    // const result = page.validata()
                    const result = page.getCtrl('表单layout').validata()
                    console.log(result)
                    if (!result) {
                      // throw Error('validata')
                      return
                    }
                  `
                }
              ],
              "style": {
                "margin": "10px 5px"
              }
            },
            {
              "type": "button",
              "value": "测试",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    console.log(page.engine)
                  `
                }
              ],
              "style": {
                "margin": "10px 5px"
              }
            }
          ]
        },
        {
          "type": "layout",
          "title": "",
          "name": "表单layout",
          "style": {
            "padding": "30px 16px",
            "flexDirection": "row",
            "flexWrap": "wrap"
          },
          "content": [
            {
              "type": "textinput",
              "titlewidth": "120",
              "title": "textinput",
              "placeholder": "textinput",
              "name": "textinput",
              "maxlength": "",
              "width": "50%",
              "required": "",
              "readonly": "",
              "eventlist": [
                {
                  "trigger": "onvaluechange",
                  "script": `
                    // console.log(eventTarget)
                    console.log('onvaluechange')
                    console.log(page.getCtrl('textinput').value)
                  `
                }
              ]
            },
            {
              "type": "select",
              "titlewidth": "120",
              "title": "select",
              "placeholder": "select",
              "name": "select",
              "width": "50%",
              "required": "",
              // "value": true,
              "value": "",
              "options": [
                {
                  "key": "0",
                  "text": "停用"
                },
                {
                  "key": "1",
                  "text": "启用"
                },
                {
                  "key": true,
                  "text": "true"
                },
                {
                  "key": false,
                  "text": "false"
                },
                {
                  "key": 0,
                  "text": "数字0"
                },
                {
                  "key": 1,
                  "text": "数字1"
                },
                {
                  "key": 2,
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
              "width": "50%",
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
              "width": "50%",
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
              "width": "50%",
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
              "type": "date",
              "titlewidth": "120",
              "title": "date",
              "placeholder": "date",
              "name": "date",
              "width": "50%",
              "required": "",
              "value": "",
              "options": [],
              "eventlist": [
                {
                  "trigger": "onvaluechange",
                  "handler": ""
                }
              ]
            },
            {
              "type": "textinput",
              "titlewidth": "120",
              "title": "textarea",
              "placeholder": "textarea",
              "name": "textarea",
              "displaytype": "textarea",
              "maxlength": "",
              "minrow": "2",
              "maxrow": "6",
              "width": "100%",
              "required": "",
              "eventlist": [
                {
                  "trigger": "onvaluechange",
                  "handler": ""
                }
              ]
            },
            {
              "type": "checkbox",
              "titlewidth": "120",
              "title": "checkbox",
              "placeholder": "checkbox",
              "name": "checkbox",
              "displaytype": "3",
              "width": "50%",
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
              "displaytype": "3",
              "width": "50%",
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
              "type": "layout",
              "title": "",
              "name": "",
              "style": {
                "width": "100%",
                "flex-direction": "row",
                "font-weight": "bold",
                "padding": "15px 0",
                "margin": "15px",
                "border-bottom": "1px solid #eee"
              },
              "content": [
                {
                  "type": "text",
                  "title": "",
                  "value": "♦",
                  "style": {
                    "font-weight": "bold",
                    "margin-right": "5px",
                    "color": "#1a85ff"
                  },
                  "eventlist": []
                },
                {
                  "type": "text",
                  "title": "",
                  "hidden": "",
                  "linenumber": "1",
                  "value": "高级配置",
                  "style": {
                    "font-weight": "bold"
                  },
                  "eventlist": []
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
              "width": "100%",
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

                    // debugger
                    // inject.uploadFileToOSS(eventTarget.selectFile).then(res => {
                    //   console.log(res)
                    //   eventTarget.handleSuccess({
                    //     filename: res.objectKey,
                    //     url: res.imageUrl
                    //   })
                    // }).catch(error => {
                    //   console.error(error)
                    //   eventTarget.handleFail()
                    // })
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
              "width": "100%",
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

                    // debugger
                    // inject.uploadFileToOSS(eventTarget.selectFile).then(res => {
                    //   console.log(res)
                    //   eventTarget.handleSuccess({
                    //     filename: res.objectKey,
                    //     url: res.imageUrl
                    //   })
                    // }).catch(error => {
                    //   console.error(error)
                    //   eventTarget.handleFail()
                    // })
                  `
                }
              ]
            },
            {
              "type": "button",
              "text": "取 消",
              "name": "取 消",
              "size": "big",
              "displaytype": "",
              "icon": "",
              "style": {
                "margin-top": "20px",
                "padding": "0 4%",
                "width": "42%"
              },
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-cancel"
                }
              ]
            },
            {
              "type": "button",
              "text": "确 定",
              "name": "确 定",
              "size": "big",
              "displaytype": "primary",
              "icon": "",
              "style": {
                "margin-top": "20px",
                "padding": "0 4%",
                "width": "42%"
              },
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-save"
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
              page.runEvent('handle-test')
              page.runEventByCode('handle-test1')
              page.triggerEvent('取值', 'onclicked')
            `
          }
        ]
      }
    ],
    "interface": [],
    "handlers": [
      {
        "code": "handle-test",
        "title": "",
        "name": "handle-test",
        "actions": [
          {
            "type": "flycode",
            "script": `
              console.log('test')
            `
          }
        ]
      },
      {
        "code": "handle-test1",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "script": `
              console.log('test1')
            `
          }
        ]
      }
    ]
  }
}
