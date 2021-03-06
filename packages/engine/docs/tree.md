# tree
树控件

## 示例

## 属性说明

```json
{
  "type": "tree",
  "code": "tree-1",
  "title": "树控件",
  "value": "",
  "multiselectable": "",
  "displaytype": "",
  "expandmodel": "",
  "intermediateselectmode": "",
  "options": [],
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


### multiselectable
是否多选，默认值为 `0`

| 值          | 说明 |
| ----------- | ---- |
| 0           | 单选 |
| 1           | 多选 |

### displaytype
控件显示样式，默认值为 `custom`

| 值          | 说明                              |
| ----------- | --------------------------------- |
| custom      | 常规输入型样式，使用下拉方式进行选值 |
| navigation  | 导航栏样式                         |

### expandmodel
控制节点展开方式，默认值为 `rootexpand`

| 值         | 说明       |
| ---------- | --------- |
| rootexpand | 展开根节点 |
| noexpand   | 不展开     |
| allexpand  | 全部展开   |

### intermediateselectmode
树控件取值模式

多选时，支持以下值，默认值为 `gather`
| 值         | 说明                                  |
| ---------- | ------------------------------------- |
| gather     | 父子有关联 共同取值 半选不取            |
| individual | 父子无关联 各自独立取值                 |
| disable    | 父子有关联 不能选非叶子节点 取值叶子节点 |
| shortcut   | 父子有关联 取值叶子节点                 |
| related    | 父子有关联 取值非叶子节点 如果只有一级 最高节点同样也是叶子节点时 则该级视为最高级 要取值 半选不取 |
| highest    | 父子有关联 取值最高节点 未实现          |



单选时，支持以下值，默认值为 `individual`
| 值         | 说明                                  |
| ---------- | ------------------------------------- |
| individual | 父子无关联 各自独立取值 默认            |
| disable    | (不能选非叶子节点 取值叶子节点) 暂不实现 |

### options
控件数据源



### value 默认值
字符串单值类型

### eventlist 事件









