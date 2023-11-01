# foreach 循环
用于展示多条结构类似的数据，可对数据进行自定义操作。

不支持分页和勾选操作。

```json
{
  "type": "foreach",
  "title": "循环控件",
  "rows": {
    "type": "layout",
    "content": []
  },
  "eventlist": []
}
```

## rows
同 list 控件。

## eventlist.trigger
+ 类型： string
+ 默认： ""

| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |


# flycode
| flycode | 说明 |
| ---- | ---- |
| value | 取值赋值 |
| focusedValue/~~checkedValue~~ | 获取焦点行/~~勾选行~~的值 |
| index/focusedIndex/~~checkedIndex~~ | 获取所有行/焦点行/~~勾选行~~序号 |
| deleteInScope() | 删除所有行/焦点行/~~勾选行~~ |
| append() | 插入行数据 |
| update() | 更新行数据 |
| row/focusedRow/~~checkedRow~~/getRowByIndex() | 获取所有行/焦点行/~~勾选行~~/传入序号行控件 |

## value
同 table 控件。

## focusedValue/~~checkedValue~~
同 table 控件。

## index/focusedIndex/~~checkedIndex~~
同 table 控件。

## deleteInScope()
同 table 控件。

## append()
同 table 控件。

## update()
同 table 控件。

## row/focusedRow/~~checkedRow~~/getRowByIndex()
同 table 控件。
