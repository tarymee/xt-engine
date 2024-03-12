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
      // "flex": "1",
      "content": [
        {
          "type": "table",
          "title": "表格",
          "name": "表格",
          "checkable": "0",
          "pageable": "0",
          "pagesize": "20",
          // "height": "500",
          "fixednumber": "0",
          "columns": [
            {
              "type": "text",
              "title": "环境",
              "name": "evn",
              "width": "100",
              "eventlist": []
            },
            {
              "type": "text",
              "title": "应用",
              "name": "appcode",
              "width": "80",
              "eventlist": []
            },
            {
              "type": "textinput",
              "title": "限制许可数",
              "name": "maxlicense",
              "width": "100",
              "eventlist": []
            },
            {
              "type": "textinput",
              "title": "购买许可数",
              "name": "buylicense",
              "width": "100",
              "eventlist": []
            },
            {
              "type": "text",
              "title": "使用数",
              "name": "uselicense",
              "width": "80",
              "eventlist": []
            },
            {
              "type": "dropdownbox",
              "title": "是否限制许可",
              "name": "islimit",
              "placeholder": "",
              "required": "1",
              "width": "100",
              "hiddenclearbtn": "",
              "options": [
                {
                  "key": "1",
                  "text": "是"
                },
                {
                  "key": "0",
                  "text": "否"
                }
              ],
              "eventlist": []
            },
            {
              "type": "date",
              "title": "有效期",
              "name": "time",
              "format": "yyyy-MM-dd",
              "unit": "date",
              "width": "150",
              "eventlist": []
            },
            {
              "type": "dropdownbox",
              "title": "应用状态",
              "name": "status",
              "placeholder": "",
              "required": "1",
              "width": "120",
              "hiddenclearbtn": "",
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
            },
            {
              "type": "tags",
              "title": "是否一致",
              "name": "issame",
              "width": "80",
              "options": [
                {
                  "key": "1",
                  "text": "是"
                },
                {
                  "key": "0",
                  "text": "否"
                }
              ],
              "eventlist": []
            }
          ],
          "operations": [],
          "rowoperations": [],
          "eventlist": [
            {
              "trigger": "onload",
              "script": `
                page.getCtrl('表格').append([
                  {
                    evn: '产品运营中心',
                    appcode: 'distribution',
                    maxlicense: '100',
                    buylicense: '10',
                    uselicense: '1',
                    islimit: '1',
                    time: '1710260906120',
                    status: '1',
                    issame: '1'
                  },
                  {
                    evn: '租户真实环境',
                    appcode: 'distribution',
                    maxlicense: '100',
                    buylicense: '10',
                    uselicense: '1',
                    islimit: '1',
                    time: '1710260906120',
                    status: '1',
                    issame: '1'
                  },
                  {
                    evn: '产品运营中心',
                    appcode: 'promotion',
                    maxlicense: '100',
                    buylicense: '10',
                    uselicense: '1',
                    islimit: '1',
                    time: '1710260906120',
                    status: '1',
                    issame: '1'
                  },
                  {
                    evn: '租户真实环境',
                    appcode: 'promotion',
                    maxlicense: '100',
                    buylicense: '10',
                    uselicense: '1',
                    islimit: '1',
                    time: '1710260906120',
                    status: '1',
                    issame: '1'
                  },
                  {
                    evn: '产品运营中心',
                    appcode: 'sales',
                    maxlicense: '100',
                    buylicense: '10',
                    uselicense: '1',
                    islimit: '1',
                    time: '1710260906120',
                    status: '1',
                    issame: '1'
                  },
                  {
                    evn: '租户真实环境',
                    appcode: 'sales',
                    maxlicense: '100',
                    buylicense: '10',
                    uselicense: '1',
                    islimit: '1',
                    time: '1710260906120',
                    status: '1',
                    issame: '1'
                  }
                ])

                setTimeout(() => {
                  const allRows = page.getCtrl('表格').row
                  console.log(allRows)
                  // debugger
                  allRows[1].getCtrl('maxlicense').readonly = true
                  allRows[3].getCtrl('maxlicense').readonly = true
                  allRows[5].getCtrl('maxlicense').readonly = true
                  allRows[1].getCtrl('buylicense').readonly = true
                  allRows[3].getCtrl('buylicense').readonly = true
                  allRows[5].getCtrl('buylicense').readonly = true
                  allRows[1].getCtrl('islimit').readonly = true
                  allRows[3].getCtrl('islimit').readonly = true
                  allRows[5].getCtrl('islimit').readonly = true
                  allRows[1].getCtrl('time').readonly = true
                  allRows[3].getCtrl('time').readonly = true
                  allRows[5].getCtrl('time').readonly = true
                  allRows[1].getCtrl('status').readonly = true
                  allRows[3].getCtrl('status').readonly = true
                  allRows[5].getCtrl('status').readonly = true
                }, 200)

              `
            }
          ]
        },
        {
          "type": "layout",
          "flexdirection": "horizontal",
          "flex": "",
          "style": {
            "backgroundColor": "#eee",
            "justify-content": "center"
          },
          "content": [
            {
              "type": "button",
              "value": "同步配置",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    page.confirm('系统检查发现产品运营中心和租户真实环境的许可配置信息不一致，确定把租户真实环境的配置同步到产品运营中心？', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消'
                    }).then(() => {
                      
                    }).catch(() => { })
                  `
                }
              ],
              "style": {
                "margin": "10px"
              }
            },
            {
              "type": "button",
              "value": "保存",
              "displaytype": "primary",
              "eventlist": [
                {
                  "trigger": "onclicked",
                  "script": `
                    page.message.error('系统检查发现产品运营中心和租户真实环境的许可配置信息不一致，请先同步数据后再进行操作。')
                  `
                }
              ],
              "style": {
                "margin": "10px"
              }
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
