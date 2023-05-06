# Address 地址选择

地址控件用于使用高德地图进行选址和地址展示。

#### 使用方法 Example

```vue
<!-- 常规用法 -->
<smt-address
  v-model:value="address"
  label="地址选择"
  name="address"
  :rules="[{ required: true, message: '请选择地址' }]"
  :reqiured="true"
  :auto="true"
>
</smt-address>

<!-- 结合 van-filed -->
  <van-field 
    required
    input-align="right"
    label="详细地址"
    name="address"
    type="textarea"
    :autosize="true"
    :rules="[{ required: true, message: '请选择或输入详细地址' }]"
  >
    <template #input>
      <smt-address v-model:value="store.address"></smt-address>
    </template>
  </van-field>

```

##### 可配置属性 Props

| 属性         | 说明                                             | 类型                                     | 默认值 |
| ------------ | ------------------------------------------------ | ---------------------------------------- | ------ |
| model:value        | 组件值                  | *Object  String*，{ address: '', latitude: '', longitude: ''}    | 无     |
| auto         | 自动定位                                         | *Boolean*                               | false |
| label | 标签，同van-field label属性 | *String*     | 无 |
| name | 同 van-field name属性                                   | *String*                               | 无     |
| rules   | 同van-field rules属性                                   | *Array*                               | 无     |
| required   | 同van-field required 属性                      | *Boolean*                      | false     |


##### 事件 Event

| 事件名         | 说明                                             | 回调参数               |
| ------------ | ------------------------------------------------ | -----------------------|
| change |       值改变事件            |  { address: '', latitude: '', longitude: ''}   |

##### 插槽 Slot

| 名称         | 说明                                             | 参数               |
| ------------ | ------------------------------------------------ | -----------------------|
| default |       自定义地址展示区域                              |  { value: Object, label: string, show: Function}   |





