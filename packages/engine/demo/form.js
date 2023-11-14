/* eslint-disable */
export default {
  "pageinfo": {
    "code": "form",
    "title": "form"
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
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "handler": "handle-get"
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
                  "handler": "handle-set"
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
                  "handler": "handle-readonly"
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
                  "handler": "handle-required"
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
                  "handler": "handle-validata"
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
                  "handler": "handle-test"
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
                  "handler": ""
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
                  "key": "2",
                  "text": "开发中"
                },
                {
                  "key": "3",
                  "text": "测试中"
                },
                {
                  "key": "4",
                  "text": "冒烟中"
                },
                {
                  "key": "5",
                  "text": "发版中"
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
              "expandmodel": "rootexpand",
              "intermediateselectmode": "individual",
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
                  "key": "2",
                  "disabled": "",
                  "text": "开发中"
                },
                {
                  "key": "3",
                  "disabled": "",
                  "text": "测试中"
                },
                {
                  "key": "4",
                  "disabled": "",
                  "text": "冒烟中"
                },
                {
                  "key": "5",
                  "disabled": "",
                  "text": "发版中"
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
                  "key": "2",
                  "disabled": "",
                  "text": "开发中"
                },
                {
                  "key": "3",
                  "disabled": "",
                  "text": "测试中"
                },
                {
                  "key": "4",
                  "disabled": "",
                  "text": "冒烟中"
                },
                {
                  "key": "5",
                  "disabled": "",
                  "text": "发版中"
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
                  "handler": "handle-attachment-onupload"
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
                  "handler": "handle-photo-onupload"
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
              // debugger
              const value = {
                textinput: page.getCtrl('textinput').value,
                select: page.getCtrl('select').value,
                tree: page.getCtrl('tree').value,
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
              page.getCtrl('textinput').value = 'textinput'
              page.getCtrl('select').value = '1'
              page.getCtrl('tree').value = '1'
              page.getCtrl('cascade').value = ['1', '1-1', '1-1-1']
              page.getCtrl('date').value = '1681228800000'
              page.getCtrl('textarea').value = 'textarea'
              page.getCtrl('checkbox').value = ['0', '4']
              page.getCtrl('radio').value = '4'
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
                // throw Error('validata')
                return
              }
            `
          }
        ]
      },
      {
        "code": "handle-readonly",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              console.log('handle-readonly')
              page.getCtrl('表单layout').readonly = !page.getCtrl('表单layout').readonly
            `
          }
        ]
      },
      {
        "code": "handle-required",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              console.log('handle-required')
              page.getCtrl('textinput').required = !page.getCtrl('textinput').required
              page.getCtrl('select').required = !page.getCtrl('select').required
              page.getCtrl('tree').required = !page.getCtrl('tree').required
              page.getCtrl('cascade').required = !page.getCtrl('cascade').required
              page.getCtrl('date').required = !page.getCtrl('date').required
              page.getCtrl('textarea').required = !page.getCtrl('textarea').required
              page.getCtrl('checkbox').required = !page.getCtrl('checkbox').required
              page.getCtrl('radio').required = !page.getCtrl('radio').required
              page.getCtrl('attachment').required = !page.getCtrl('attachment').required
              page.getCtrl('photo').required = !page.getCtrl('photo').required
            `
          }
        ]
      },
      {
        "code": "handle-cancel",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              console.log('handle-cancel')
            `
          }
        ]
      },
      {
        "code": "handle-save",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              console.log('handle-save')
            `
          }
        ]
      },
      {
        "code": "handle-test",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              console.log(page.engine)
            `
          }
        ]
      },
      {
        "code": "handle-photo-onupload",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
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
        "code": "handle-attachment-onupload",
        "title": "",
        "name": "",
        "actions": [
          {
            "type": "flycode",
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
      }
    ]
  }
}
