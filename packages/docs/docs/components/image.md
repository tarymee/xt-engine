# image 图片


# 协议

```json
{
  "type": "image",
  "title": "图片",
  "value": "",
  "fit": "fill",
  "eventlist": []
}
```

## value
+ 类型： string
+ 默认： ""

控件初始值，取值类型为 `图片地址` 或 `图片base64编码`。

## fit
+ 类型： "fill" | "contain" | "cover" | "none" | "scale-down"
+ 默认： "fill"

确定图片如何适应容器框，同原生 object-fit https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit

| 值 | 说明 |
| ---- | ---- |
| fill | 不保证保持原有的比例，内容拉伸填充整个内容容器。 |
| contain | 保持原有尺寸比例。内容被缩放。 |
| cover | 保持原有尺寸比例。但部分内容可能被剪切。 |
| none | 保留原有元素内容的长度和宽度，也就是说内容不会被重置。 |
| scale-down | 保持原有尺寸比例。内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。 |

## eventlist.trigger
+ 类型： string
+ 默认： ""

| 值 | 说明 |
| ---- | ---- |
| onload | 加载时触发 |
