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
              "type": "tags",
              "title": "应用",
              "name": "appcode",
              "width": "100",
              "options": [
                {
                  "key": "distribution",
                  "text": "distribution",
                  "type": "success",
                  "effect": "dark"
                },
                {
                  "key": "promotion",
                  "text": "promotion",
                  "type": "",
                  "effect": "dark"
                },
                {
                  "key": "sales",
                  "text": "sales",
                  "type": "danger",
                  "effect": "dark"
                }
              ],
              "eventlist": []
            },
            {
              "type": "tags",
              "title": "环境",
              "name": "evn",
              "width": "110",
              "options": [
                {
                  "key": "产品运营中心",
                  "text": "产品运营中心",
                  "type": "success",
                  "effect": "light"
                },
                {
                  "key": "租户真实环境",
                  "text": "租户真实环境",
                  "type": "",
                  "effect": "light"
                }
              ],
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
              "type": "dropdownbox",
              "title": "是否限制许可",
              "name": "islimit",
              "placeholder": "",
              "width": "100",
              "hiddenclearbtn": "1",
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
              "width": "170",
              "eventlist": []
            },
            {
              "type": "dropdownbox",
              "title": "应用状态",
              "name": "status",
              "placeholder": "",
              "width": "100",
              "hiddenclearbtn": "1",
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
              "type": "text",
              "title": "更新时间",
              "name": "createtime",
              "width": "140",
              "eventlist": []
            },
            {
              "type": "tags",
              "title": "数据是否一致",
              "name": "issame",
              "width": "100",
              "options": [
                {
                  "key": "1",
                  "text": "是",
                  "type": "success",
                  "effect": "plain"
                },
                {
                  "key": "0",
                  "text": "否",
                  "type": "danger",
                  "effect": "plain"
                }
              ],
              "eventlist": []
            },
            {
              "type": "tags",
              "title": "环境",
              "name": "evn1",
              "width": "110",
              "options": [
                {
                  "key": "产品运营中心",
                  "text": "产品运营中心",
                  "type": "success",
                  "effect": "light"
                },
                {
                  "key": "租户真实环境",
                  "text": "租户真实环境",
                  "type": "",
                  "effect": "light"
                }
              ],
              "eventlist": []
            },
            {
              "type": "text",
              "title": "限制许可数",
              "name": "maxlicense1",
              "width": "90",
              "eventlist": []
            },
            {
              "type": "text",
              "title": "购买许可数",
              "name": "buylicense1",
              "width": "90",
              "eventlist": []
            },
            {
              "type": "tags",
              "title": "是否限制许可",
              "name": "islimit1",
              "placeholder": "",
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
              "type": "text",
              "title": "有效期",
              "name": "time1",
              "width": "100",
              "eventlist": []
            },
            {
              "type": "tags",
              "title": "应用状态",
              "name": "status1",
              "placeholder": "",
              "width": "70",
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
              "type": "text",
              "title": "已使用数",
              "name": "uselicense1",
              "width": "80",
              "eventlist": []
            },
            {
              "type": "text",
              "title": "实际使用数",
              "name": "realuselicense1",
              "width": "90",
              "eventlist": []
            },
            {
              "type": "text",
              "title": "更新时间",
              "name": "createtime1",
              "width": "140",
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
                    appcode: 'distribution',
                    evn: '产品运营中心',
                    maxlicense: '100',
                    buylicense: '10',
                    islimit: '1',
                    time: '1710260906120',
                    status: '1',
                    createtime: '2024-03-13 12:20:20',
                    evn1: '租户真实环境',
                    maxlicense1: '100',
                    buylicense1: '10',
                    uselicense1: '1',
                    realuselicense1: '1',
                    islimit1: '1',
                    time1: '2024-03-13',
                    status1: '1',
                    createtime1: '2024-03-13 12:20:20',
                    issame: '1'
                  },
                  {
                    appcode: 'promotion',
                    evn: '产品运营中心',
                    maxlicense: '100',
                    buylicense: '10',
                    islimit: '1',
                    time: '1710260906120',
                    status: '1',
                    createtime: '2024-03-13 12:20:20',
                    evn1: '租户真实环境',
                    maxlicense1: '100',
                    buylicense1: '10',
                    uselicense1: '1',
                    realuselicense1: '1',
                    islimit1: '1',
                    time1: '2024-03-13',
                    status1: '1',
                    createtime1: '2024-03-13 12:20:20',
                    issame: '1'
                  },
                  {
                    appcode: 'sales',
                    evn: '产品运营中心',
                    maxlicense: '100',
                    buylicense: '10',
                    islimit: '1',
                    time: '1710260906120',
                    status: '1',
                    createtime: '2024-03-13 12:20:20',
                    evn1: '租户真实环境',
                    maxlicense1: '100',
                    buylicense1: '10',
                    uselicense1: '1',
                    realuselicense1: '1',
                    islimit1: '1',
                    time1: '2024-03-13',
                    status1: '1',
                    createtime1: '2024-03-13 12:20:20',
                    issame: '1'
                  }
                ])

                // setTimeout(() => {
                //   const allRows = page.getCtrl('表格').row
                //   console.log(allRows)
                //   // debugger
                //   allRows[1].getCtrl('maxlicense').readonly = true
                //   allRows[3].getCtrl('maxlicense').readonly = true
                //   allRows[5].getCtrl('maxlicense').readonly = true
                //   allRows[1].getCtrl('buylicense').readonly = true
                //   allRows[3].getCtrl('buylicense').readonly = true
                //   allRows[5].getCtrl('buylicense').readonly = true
                //   allRows[1].getCtrl('islimit').readonly = true
                //   allRows[3].getCtrl('islimit').readonly = true
                //   allRows[5].getCtrl('islimit').readonly = true
                //   allRows[1].getCtrl('time').readonly = true
                //   allRows[3].getCtrl('time').readonly = true
                //   allRows[5].getCtrl('time').readonly = true
                //   allRows[1].getCtrl('status').readonly = true
                //   allRows[3].getCtrl('status').readonly = true
                //   allRows[5].getCtrl('status').readonly = true
                // }, 200)

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
