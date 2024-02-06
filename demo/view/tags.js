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
      "hidden": "",
      "style": {
        "width": "800px",
        "margin": "30px auto"
      },
      "content": [
        {
          "type": "table",
          "title": "表格",
          "name": "表格",
          "checkable": "1",
          "pageable": "0",
          "pagesize": "20",
          "fixednumber": "0",
          "columns": [
            {
              "type": "tags",
              "title": "tags-单值-字符串",
              "name": "tags_1",
              "width": "150",
              "options": [
                {
                  "key": "1",
                  "text": "启用"
                },
                {
                  "key": "0",
                  "text": "停用"
                },
                {
                  "key": "2",
                  "text": "开发中"
                }
              ],
              "eventlist": []
            },
            {
              "type": "tags",
              "title": "tags-单值-对象",
              "name": "tags_2",
              "width": "150",
              "options": [
                {
                  "key": "1",
                  "text": "启用"
                },
                {
                  "key": "0",
                  "text": "停用"
                },
                {
                  "key": "2",
                  "text": "开发中"
                }
              ],
              "eventlist": []
            },
            {
              "type": "tags",
              "title": "tags-多值-字符串",
              "name": "tags_3",
              "width": "150",
              "options": [
                {
                  "key": "1",
                  "text": "启用"
                },
                {
                  "key": "0",
                  "text": "停用"
                },
                {
                  "key": "2",
                  "text": "开发中"
                }
              ],
              "eventlist": []
            },
            {
              "type": "tags",
              "title": "tags-多值-对象",
              "name": "tags_4",
              "width": "150",
              "options": [
                {
                  "key": "1",
                  "text": "启用"
                },
                {
                  "key": "0",
                  "text": "停用"
                },
                {
                  "key": "2",
                  "text": "开发中"
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
                      tags_1: '1',
                      tags_2: JSON.stringify({ "key": "1", "text": "启用xxx" }),
                      tags_3: JSON.stringify(['1', '2']),
                      tags_4: JSON.stringify([{ "key": "1", "text": "启用aaa" }, { "key": "0", "text": "停用bbb" }]),
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
                      productname: '娃哈哈',
                      productcode: '004',
                      status: '0',
                      unit: 'box'
                    }, 0)
                  `
                }
              ]
            }
          ],
          "rowoperations": [],
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
