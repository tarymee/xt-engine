/* eslint-disable */
export default {
  "pageinfo": {
    "code": "eventflycode",
    "title": "eventflycode"
  },
  "view": {
    "body": {
      "type": "layout",
      "flex": "1",
      "hidden": "",
      "style": {
        "width": "80%",
        "margin": "16px auto"
      },
      "content": [
        {
          "type": "layout",
          "flex": "",
          "hidden": "",
          "style": {
            // "flex-direction": "row"
          },
          "content": [
            {
              "type": "radio",
              "name": "投放对象",
              "title": "投放对象",
              "value": "",
              "titlewidth": "110",
              "displaytype": "auto",
              "style": {
                "width": "100%"
              },
              "options": [
                {
                  "key": JSON.stringify({
                    "modulekey": "customervisit",
                    "modulename": "客户拜访",
                    "moduleversion": "v1.0",
                    "apply": [
                      {
                        "user": "sales",
                        "range": [
                          "sales",
                          "distribution",
                          "promotion"
                        ]
                      }
                    ],
                    "releaseRange": [
                      {
                        "title": "品牌商",
                        "appcode": "sales",
                        "basicSql": "select member.orgstructid as submitop, member.orgname as submitter, userinfo.phonenumber as phone, position.positionname as position, member.codepath as codepath, org.fullname as org from pl_orgstruct member join pl_userinfo userinfo on member.userinfoid = userinfo.userinfoid and member.status = 1 and member.platstatus = 1 join pl_orgstruct post on member.parentorgstructid = post.orgstructid join pl_orgstruct org on member.orgid = org.orgstructid and org.orgstructtypeid = 1 left join pl_position position on post.positionid = position.positionid",
                        "dimensions": [
                          {
                            "title": "营销组织",
                            "dimension": "organization",
                            "option": "batch_like",
                            "whereColum": "org.codepath like any (array[$value])",
                            "existSql": "",
                            "pagecode": "modulekey:path"
                          },
                          {
                            "title": "职位",
                            "dimension": "position",
                            "option": "in",
                            "whereColum": "post.positionid in ($value)",
                            "existSql": "",
                            "pagecode": "modulekey:path"
                          }
                        ]
                      },
                      {
                        "title": "经销商",
                        "appcode": "distribution",
                        "basicSql": "select member.orgstructid as submitop, member.orgname as submitter, position.positionname as position, userinfo.phonenumber as phone, dmsorg.orgname as belong_distributor, sfaorg.codepath, sfaorg.fullname as org from ka_kq_channelcustomers kkc join pl_orgstruct dmsorg on kkc.id = dmsorg.orgstructid and kkc.cooperativestatus = 1 and kkc.status = 1 and kkc.platstatus = 1 join pl_orgstruct post on dmsorg.orgstructid = post.parentorgstructid join pl_orgstruct member on post.orgstructid = member.parentorgstructid and member.orgtypeid = 205 and member.status = 1 and member.platstatus = 1 join pl_orgstruct sfaorg on kkc.saleareaid = sfaorg.orgstructid left join pl_position position on post.positionid = position.positionid left join pl_userinfo userinfo on member.userinfoid = userinfo.userinfoid left join pl_dictionary dic on dic.dickey = kkc.channeltype and dic.platstatus = 1 left join pl_dictionary path on dic.keypath like path.keypath || '%'",
                        "dimensions": [
                          {
                            "title": "营销组织",
                            "dimension": "organization",
                            "option": "batch_like",
                            "whereColum": "sfaorg.codepath like any (array[$value])",
                            "existSql": "",
                            "pagecode": "modulekey:path"
                          },
                          {
                            "title": "职位",
                            "dimension": "position",
                            "option": "in",
                            "whereColum": "post.positionid in ($value)",
                            "existSql": "",
                            "pagecode": "modulekey:path"
                          }
                        ]
                      },
                      {
                        "title": "促销导购",
                        "appcode": "promotion",
                        "basicsql": "select member.orgid, member.orgstructid as submitop, member.orgname as submitter, userinfo.phonenumber as phone, position.positionname as position, member.codepath as codepath, org.fullname as org, store.storename as associate_store, kkc.channelname as belong_distributor from pl_orgstruct member join pl_userinfo userinfo on member.userinfoid = userinfo.userinfoid and member.orgstructtypeid = 3 and member.status = 1 and member.platstatus = 1 join pl_orgstruct post on member.parentorgstructid = post.orgstructid join pl_orgstruct org on post.parentorgstructid = org.orgstructid left join pl_position position on post.positionid = position.positionid left join ka_kq_channelcustomers kkc on kkc.id = userinfo.distrbutorid and kkc.status = 1 and kkc.platstatus = 1 left join kx_pmm_storerepresentative kps on kps.representativeid = member.orgstructid left join kx_kq_store store on store.id = kps.storeid",
                        "dimensions": [
                          {
                            "title": "促销组织",
                            "dimension": "organization",
                            "option": "batch_like",
                            "wherecolum": "org.codepath like any (array[$value]) ",
                            "existsql": "",
                            "pagecode": "modulekey:path"
                          },
                          {
                            "title": "职位",
                            "dimension": "position",
                            "option": "in",
                            "wherecolum": "post.positionid in ($value)",
                            "existsql": "",
                            "pagecode": "modulekey:path"
                          }
                        ]
                      }
                    ]
                  }, null, 2),
                  "text": "初始投放[品牌商/经销商/促销导购]"
                },
                {
                  "key": JSON.stringify({}, null, 2),
                  "text": "扩展投放"
                }
              ],
              "eventlist": [
                {
                  "trigger": "onvaluechange",
                  "script": `
                    const a = page.getCtrl('投放对象').value
                    page.getCtrl('投放对象协议').value = a
                  `
                }
              ]
            },
            {
              "type": "textinput",
              "name": "投放对象协议",
              "title": "投放对象协议",
              "titlewidth": "110",
              "displaytype": "textarea",
              "readonly": "1",
              "minrow": "5",
              "value": "",
              "style": {
                "width": "100%"
              },
              "eventlist": []
            },
            {
              "type": "radio",
              "name": "客户属性",
              "title": "客户属性",
              "value": "",
              "titlewidth": "110",
              "displaytype": "auto",
              "style": {
                "width": "100%"
              },
              "options": [
                {
                  "key": JSON.stringify({
                    "name": "444"
                  }, null, 2),
                  "text": "初始客户属性[终端客户/经销商客户/分销商客户]"
                },
                {
                  "key": JSON.stringify({
                    "name": "555"
                  }, null, 2),
                  "text": "扩展客户属性"
                }
              ],
              "eventlist": [
                {
                  "trigger": "onvaluechange",
                  "script": `
                    const a = page.getCtrl('客户属性').value
                    page.getCtrl('客户属性协议').value = a
                  `
                }
              ]
            },
            {
              "type": "textinput",
              "name": "客户属性协议",
              "title": "客户属性协议",
              "titlewidth": "110",
              "displaytype": "textarea",
              "readonly": "1",
              "minrow": "5",
              "value": "",
              "style": {
                "width": "100%"
              },
              "eventlist": []
            }
          ]
        },
        {
          "type": "button",
          "value": "确定",
          "eventlist": [
            {
              "trigger": "onclicked",
              "script": `
                const a = page.getCtrl('投放对象协议').value
                const b = page.getCtrl('客户属性协议').value
                console.log(a)
                console.log(b)
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
    "handlers": []
  },
  "businessmodel": []
}
