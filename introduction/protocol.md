# 介绍
`UI表单`（下面简称`表单`）是由JSON格式表达的，承载业务逻辑和UI的主体，是实现业务功能的基本单位。

一个表单经过引擎渲染成一个完整的前端页面，它由以下几部分组成：

+ pageinfo: 描述表单基本信息
+ view: 描述表单前端界面
+ presenter: 定义表单的事件

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


# pageinfo
+ 类型： IPageinfo

```typescript
interface IPageinfo {
  code: string
  title: string
  eventlist: IEvent[]
}

interface IEvent {
  trigger: string
  handler?: string
  script?: string
}
```

描述表单基本信息。

```json
{
  "pageinfo": {
    "code": "123456",
    "title": "test",
    "eventlist": [
      {
        "trigger": "onload",
        "handler": "",
        "script": ""
      },
      {
        "trigger": "onunload",
        "handler": "",
        "script": ""
      }
    ]
  }
}
```

## code
+ 类型： string
+ 默认： ""

表单页面编码，如果为空，会随机生成 uuid 填充。

## title
+ 类型： string
+ 默认： ""

表单页面标题。


## eventlist
表单生命周期事件。类型、用法跟[控件事件](components/index?id=控件事件)保持一致。


## eventlist.trigger
+ 类型： "onload" | "onunload"
+ 默认： ""

| 值 | 说明 |
| ---- | ---- |
| onload | 表单加载时触发 |
| onunload | 表单被销毁时触发 |

# view
+ 类型： IView

```typescript
interface IView {
  body: ILayoutViewRule
  subviews?: IPopviewViewRule[]
}
```
这部分是关于表单的显示的UI的定义，是由各种控件相互嵌套组合后，共同确定表单的显示的样子。

控件显示的布局是根据标准的 `flexbox` 布局规则来处理的。

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

## body
+ 类型： ILayoutViewRule

```typescript
interface ILayoutViewRule {
  type: 'layout'
  content: IViewRule[]
  [propName: string]: any
}
```

`body` 为表单主要的显示内容定义区域，其内容约定为只能放置一个 `layout` 控件，作为整个表单的显示内容的根容器。表单中需要显示的内容，需要定义在该容器的 content 属性中。

## subviews
+ 类型： IPopviewViewRule

```typescript
interface IPopviewViewRule {
  type: 'popview'
  content: IViewRule[]
  [propName: string]: any
}
```

`subviews` 为表单子视图，用于定义表单中的内嵌子页面，方便页面规划，可用于例如添加或编辑数据等场景，能减少表单间参数与事件传递的麻烦。

子视图中必须放置 `popview` 容器控件，子视图中的数据，只在子视图创建（弹出）时可用，其他时候不可用。子视图弹出后，子视图和主视图之间的数据可以无缝共享，随时相互存取。

一个表单可以定义多个子视图，但同一时间只能弹出一个子视图。

# presenter
+ 类型： IPresenter

```typescript
interface IPresenter {
  initial: IHandleEvent[]
  handlers: IHandleEvent[]
  interface: IHandleEvent[]
}

interface IHandleEvent {
  code: string
  title: string
  name: string
  actions: IFlycodeAction[]
}

interface IFlycodeAction {
  code: string
  title: string
  type: string
  script: string
}
```

`presenter` 是集中承载表单的逻辑处理的模块，所有的控件的取值，赋值，按钮行为的处理，数据请求，表单跳转等表单的行为逻辑都会在此定义。

由于表单逻辑通常很繁杂，为了更清晰的划分和组织不同的逻辑处理，我们将 `presenter` 分为以下部分：

+ 页面初始化事件
+ 页面事件
+ 页面监听事件

## initial
+ 类型： IHandleEvent[]

页面初始化事件。

放置在这里的事件，会在表单初始化时自动按顺序执行。

## handlers
+ 类型： IHandleEvent[]

页面事件的放置区域，该区域的事件通常由控件触发，例如点击按钮，列表加载数据等。

`handlers` 中可以有多个独立的事件，每个事件由一系列的行为构成。

```json
{
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
    },
    ...
  ]
}
```


## interface
+ 类型： IHandleEvent[]

页面监听事件，暂不实现。
