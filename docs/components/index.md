# 控件分类
控件可分为以下类型：

+ 容器控件
+ 基础控件
+ 输入型控件
+ 数组控件

# 控件协议
控件协议是一种 `JSON` 对象格式的协议，由不同的控件属性组成，根据不同的 `type` 值区别不同种类的控件。
以 `textinput` 文本输入框控件为例，它的协议如下：

```json
{
  "type": "textinput",
  "title": "文本输入框",
  "value": "",
  "displaytype": "",
  "eventlist": [
    {
      "trigger": "onvaluechange",
      "handler": "",
      "script": ""
    },
    {
      "trigger": "onload",
      "handler": "",
      "script": ""
    }
  ]
}
```

# 控件通用属性
所有类型的控件都会有的属性：

| 属性名称 | 说明 |
| ---- | ---- |
| type | 控件类型 |
| code | 控件编码 必须唯一 可为空 引擎自动生成 |
| title | 控件类型标题 |
| name | 控件名称 用于 flycode |
| value | 控件初始值 |
| hidden | 控件是否隐藏 |
| readonly | 控件是否只读 |
| style | css 样式对象 |
| css | css 样式 |
| class | css 类名 |
| width | 宽度 |
| height | 高度 |
| flex | flex |


输入型控件都会有的属性：

| 属性名称 | 说明 |
| ---- | ---- |
| required | 控件是否必填 |
| textual | 控件是否显示成文本模式 |
| placeholder | 占位文字 |
| hiddenclearbtn | 是否隐藏清空数据按钮 |
| titlewidth | 标题的绝对宽度 |

## title
+ 类型：`string`
+ 默认：`""`

控件的标题，其显示方式受控件的具体类型和显示模式影响。
当控件放置在表格中后，其标题将会作为表格的表头标题显示。

## name
+ 类型：`string`
+ 默认：`""`

控件名称，用于 `flycode` 获取控件实例使用。

## value
+ 类型：`any`
+ 默认：`""`

控件初始值，通过该属性对控件的默认值进行设定。
取值类型基于控件类型有所不同，比如，数组型控件则取值类型为 `array`，普通控件取值类型为 `string`。

## hidden
+ 类型：`boolean | "1" | "0"`
+ 默认：`"0"`

控件是否隐藏。

## readonly
+ 类型：`boolean | "1" | "0"`
+ 默认：`"0"`

控件是否只读。
当控件为`容器控件/数组型控件`时，使用 `flycode` 赋值控件 `readonly` 属性时会对控件内部的所有控件都生效。

示例：
```js
// 设置 layout/filter/popview/tabboard/table/list/foreach 控件下的所有控件为只读
page.getCtrl('layout').readonly = true
page.getCtrl('filter').readonly = true
page.getCtrl('popview').readonly = true
page.getCtrl('tabboard').readonly = true
page.getCtrl('table').readonly = true
page.getCtrl('list').readonly = true
page.getCtrl('foreach').readonly = true
```

## style
+ 类型：`object | null`
+ 默认：`null`

设置控件样式，接受`CSS样式对象`。

```json
{
  "type": "text",
  "title": "文本",
  "value": "文本",
  "style": {
    "font-size": "12px",
    "font-weight": "bold"
  }
}
```

## css/class
+ 类型：`string`
+ 默认：`""`

`style` 只能对控件最外层的样式进行设置，如果想更改控件内部元素结构的样式，必须使用 `css + class` 进行设置。

```json
// 更改按钮控件内部文字大小
{
  "type": "button",
  "title": "按钮",
  "value": "按钮",
  "class": "xxx",
  "css": ".xxx .el-button { font-size: 16px; }"
}
```

## width/height
+ 类型：`string`
+ 默认：`""`

设置控件宽度/高度，接收CSS单位值，如 `px` `%` `vw` `vh` 等等。
与在 `style` 样式对象里设置 `width/height` 效果是一样的。

## required
+ 类型：`boolean | "1" | "0"`
+ 默认：`"0"`

输入型控件是否必填。

## textual
+ 类型：`boolean | "1" | "0"`
+ 默认：`"0"`

输入型控件是否显示成文本模式。

## placeholder
+ 类型：`string`
+ 默认：`""`

输入型控件的输入框占位文字。

## hiddenclearbtn
+ 类型：`boolean | "1" | "0"`
+ 默认：`"0"`

输入型控件是否隐藏清空值按钮。

## titlewidth
+ 类型：`string`
+ 默认：`"30%"`

控件标题宽度，接收CSS单位值，如 `px` `%` `vw` `vh` 等等。


# 控件事件

## eventlist
```typescript
interface IEvent {
  trigger: string
  handler?: string
  script?: string
}
```

+ 类型：`IEvent[]`
+ 默认：`[]`

所有控件都支持绑定事件去执行业务逻辑。

## eventlist.trigger
表示控件所支持的触发事件，以 `on` 作为前缀。
一般来说，所有的控件都支持 `onload` 事件，输入型控件支持 `onvaluechange` 事件，大部分普通控件支持 `onclicked` 事件，等等。
以下是比较常用的事件：

| 值 | 说明 |
| ---- | ---- |
| onload | 控件加载时触发 |
| onclicked | 控件被点击时触发 |
| onvaluechange | 控件值改变时触发 |
| onchecked | 行数据被勾选时触发，一般数组型控件有该事件 |

不同的控件所支持的触发事件有所不同，请到具体控件的详细说明文档里查看。

## eventlist.handler
当控件某个事件被触发时，所要执行的事件钩子，`eventlist.handler` 用来关联事件 `presenter.handlers` 里的`事件 code`。

## eventlist.script
当控件某个事件被触发时，所要执行的 `flycode`，它与 `eventlist.handler` 只能二者选其一。
一般来说，如果要执行的逻辑比较简单，或者不想关联 `事件 code` 的话，可以用此方式。

## 示例
```json
{
  "type": "textinput",
  "title": "文本输入框",
  "value": "",
  "eventlist": [
    {
      "trigger": "onload",
      "script": "console.log('onload')" // 当文本输入框被加载时控制台打印 'onload'
    }
    {
      "trigger": "onvaluechange",
      "handler": "123456789" // 当文本输入框值改变时触发执行 code 为 123456789 的事件。
    }
  ]
}
```
