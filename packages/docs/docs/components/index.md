# 控件基础

## 控件分类
控件可分为以下类型：

+ 容器控件
+ 基础控件
+ 输入型控件
+ 数组控件

## 控件协议
控件协议是一钟json对象格式的协议，由不同的控件属性组成，根据不同的 type 值区别不同种类的控件。

以 textinput 文本输入框控件为例，它的协议如下：

```json
{
  "type": "textinput",
  "title": "文本输入框",
  "value": "",
  "displaytype": "",
  "eventlist": [
    {
      "trigger": "onvaluechange",
      "handler": ""
    },
    {
      "trigger": "onload",
      "handler": ""
    }
  ]
}
```

## 控件通用属性
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
| eventlist | 事件数组 |
| eventlist.trigger | 事件触发时机 |
| eventlist.handler | 关联事件code |

输入型控件都会有的属性：

| 属性名称 | 说明 |
| ---- | ---- |
| required | 控件是否必填 |
| placeholder | 占位文字 |
| hiddenclearbtn | 是否隐藏清空数据按钮 |
| titlewidth | 标题的绝对宽度 |

## title
控件的标题，其显示方式受控件的具体类型和显示模式影响。

当控件放置在表格中后，其标题将会固定显示在表格的表头。


## name
控件名称，用于 flycode 获取控件实例使用。

## value
控件初始值，通过该属性对控件的默认值进行设定。

取值类型基于控件类型有所不同，比如，table/list/foreach 数组型控件则取值类型为 array，textinput/text 等大部分控件取值类型为 string。

## hidden

## readonly

## style css class

## eventlist

## required

## placeholder

## hiddenclearbtn

## titlewidth
