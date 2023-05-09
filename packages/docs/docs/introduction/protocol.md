# 介绍


## UI表单协议

```json
{
  "pageinfo": {...},
  "view": {
    "body": {...},
    "subviews": [...]
  },
  "presenter": {
    "initial": [...],
    "interface": [...],
    "handlers": [...]
  }
}
```


## pageinfo
此处定义表单整体的一些信息，包含表单标题，code，表单的加载事件等

```json
{
  "pageinfo": {
    "code": "907788671254663213",
    "title": "品项检查",
    "eventlist": [
      {
        "trigger": "onload",
        "handler": ""
      },
      {
        "trigger": "onunload",
        "handler": ""
      }
    ]
  }
}
```

| 属性名称 | 说明 | 取值类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| code | 页面编码 必须唯一 | string | -- |
| title | 页面标题 | string | -- |
| eventlist | 事件列表 | array | [] |
| eventlist.handler | 事件code | string | -- |
| eventlist.trigger | 事件触发时机 | string | -- |

## view
这部分是关于表单的显示的UI的定义，是由各种控件相互嵌套组合后，共同确定表单的显示的样子。

控件显示的布局是根据标准的 flexbox 布局规则来处理的。

```json
{
  "view": {
    "body": {
      "type": "layout",
      "content": [
        {
          "type": "text",
          "value": "test"
        }
      ]
    },
    "subviews": [
      {
        "type": "popview",
        "code": "",
        "content": []
      }
    ]
  }
}
```

| 属性名称 | 说明 | 取值类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| body | 主视图 | object | layout |
| subviews | 子视图 | array | [] |

### body
此处为表单主要的显示内容定义区域，其内容约定为只能放置一个 flex == 1 的 layout 控件，作为整个表单的显示内容的根容器。表单中需要显示的内容，需要定义在该容器的 content 属性中。

关于 layout 控件更多的说明请参看 layout 控件详细说明

### subviews
子视图，用于定义表单中的内嵌子页面，方便页面规划，可用于例如添加或编辑数据等场景，能减少表单间参数与事件传递的麻烦。

子视图中必须放置 popview  容器控件，关于 popview 容器控件更多的说明请参看 popview 控件详细说明

子视图中的数据，只在子视图创建（弹出）时可用，其他时候不可用。子视图弹出后，子视图和主视图之间的数据可以无缝共享，随时相互存取。

一个表单可以定义多个子视图，但同一时间只能弹出一个子视图。


## presenter
这部分是集中承载表单的逻辑处理的模块，所有的控件的取值，赋值，按钮行为的处理，数据请求，表单跳转等表单的行为逻辑都会在此定义。

由于表单逻辑通常很繁杂，为了更清晰的划分和组织不同的逻辑处理，我们将 Presenter 分为以下部分：

```json
{
  "presenter": {
    "initial": [...],
    "interface": [...],
    "handlers": [...]
  }
}
```

| 属性名称 | 说明 | 取值类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| initial | 页面初始化事件 | array | [] |
| interface | 页面监听事件 | array | [] |
| handlers | 页面事件 | array | [] |

### initial
页面初始化的时候调用的事件放置的区域。

### interface
页面监听事件，暂不实现。

### handlers
表单内部逻辑的放置区域，该区域的事件通常由控件触发，例如点击按钮，列表加载数据等。

handlers 中可以有多个独立的事件，每个事件由一系列的行为构成。

```json
{
  "presenter": {
    "handlers": [
      {
        "code": "handle-new",
        "title": "新增",
        "name": "",
        "actions": [
          {
            "type": "flycode",
            "title": "flycode",
            "script": `
              page.getCtrl('详情页面').hidden = false
            `
          }
        ]
      }
    ]
  }
}
```
