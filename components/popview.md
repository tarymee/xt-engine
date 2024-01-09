# popview 弹窗
专用于弹窗的`子视图`控件，只在表单协议中的 `view.subviews` 中使用，不能在其他容器中配置。
`子视图`中的控件，在`子视图`弹出时创建，关闭时销毁。
`子视图`弹出后，`子视图`和`主视图`之间的数据可以无缝共享，随时相互存取。

```json
{
  "type": "popview",
  "title": "弹窗",
  "eventlist": []
}
```

## value
+ 类型：`any`
+ 默认：`""`

专属于`popview`控件的内存值，当`popview`弹出时创建，关闭时销毁。
当`popview`被打开时，可以使用`flycode`赋值`popview`所需要使用的数据，这样当需要使用该数据时可以用`flycode`获取，当`popview`被关闭时该数据会同步被销毁，没有副作用。

## eventlist.trigger
+ 类型：`string`
+ 默认：`""`

| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
| onopen | 打开时触发 |
| onclose | 关闭时触发 |
