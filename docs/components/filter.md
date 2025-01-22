# filter 搜索栏
用于显示并录入搜索条件，触发搜索行为的控件。


```json
{
  "type": "filter",
  "title": "搜索栏",
  "bindcallbtn": "",
  "searchcondition": {
    "basic": [
      {
        "type": "textinput",
        "title": "",
        "name": "查询-名称",
        "placeholder": "名称",
        "required": "",
        "eventlist": []
      }
    ],
    "advanced": []
  },
  "eventlist": []
}
```

## bindcallbtn
+ 类型：`boolean | "1" | "0"`
+ 默认：`"0"`

是否配置独立的搜索按钮。
默认为 `"0"`，即不配置，任意条件改变都自动触发搜索。
如果为 `"1" | true`，即配置搜索按钮，则要点击该按钮后才统一触发搜索。

## searchcondition
用于搜索的条件，分为基础和高级两部分显示，两个部分是 and 的关系，所以在配置的时候，如果已经在基础部分有的条件，就不用配置在高级部分。

## searchcondition.basic
基础搜索，指直接显示在表单界面上，方便用户快捷搜索的搜索条件，支持输入型控件。
取值类型为`输入型控件协议对象数组`。
放置在基础条件里面的搜索控件，会在其值改变的时候，也就是 `onvaluechange` 事件触发的时候，执行对应的 `handler` 事件。

## searchcondition.advanced
高级搜索，当有很多搜索条件，需要保持页面整洁的时候，就需要把部分搜索条件隐藏起来，需要的时候再点击“高级搜索”按钮出来搜索。
前端会自动在高级搜索界面增加`重置`和`确定`两个按钮，分别用与清空条件和执行事件。
取值类型为`输入型控件协议对象数组`。

此功能暂未实现。

## eventlist.trigger
+ 类型：`string`
+ 默认：`""`

| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onvaluechange | 接管搜索栏内输入型控件的值改变事件，值改变时触发 |
