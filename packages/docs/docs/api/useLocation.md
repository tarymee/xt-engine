# useLocation 地理位置信息

用于获取地理位置等信息。

## getLocation()
获取当前地理位置信息：经纬度，地址。

##### 类型：
```js
type Location = {
  longitude: string;
  latitude: string;
  address: string;
  [propName: string]: any;
} | null

function getLocation(): Promise<Location>
```

##### 示例：
```js
const { useLocation } = inject('service')
const { getLocation } = useLocation()
getLocation().then(res => {
  console.log(res)
})
```

## getAddress()
基于经纬度，获取该经纬度的具体地址信息。

##### 类型：
```js
function getAddress(position: {
  longitude: string;
  latitude: string;
}): Promise<string>
```

##### 示例：
```js
const { useLocation } = inject('service')
const { getAddress } = useLocation()
getAddress({
  longitude: '114.280637',
  latitude: '24.125178'
}).then(res => {
  console.log(res)
})
```
