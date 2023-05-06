# wxwork 企业微信相关服务
企业微信JS-SDK是企业微信面向网页开发者提供的基于企业微信内的网页开发工具包。

通过使用企业微信JS-SDK，网页开发者可借助企业微信高效地使用拍照、选图、语音、位置等手机系统的能力，同时可以直接使用企业微信分享、扫一扫等企业微信特有的能力，为企业微信用户提供更优质的网页体验。

> 所有的JS接口只能在企业微信应用的可信域名下调用(包括子域名)，且可信域名必须有ICP备案且在管理端验证域名归属。验证域名归属的方法在企业微信的管理后台“我的应用”里，进入应用，设置应用可信域名。

查阅 API 学习：https://developer.work.weixin.qq.com/document/path/90513

## JSSDK
H5 引擎对企业微信 JS-SDK 进行了封装，自动处理了前置使用条件：引入js文件 - 权限验证（签名） - 成功回调等流程，开发只需关注业务功能。

使用时，先通过 config 接口注入需要使用的 JS 接口列表，即可在 Promise 的回调中使用 JS-SDK 的 API。

```js
const { wxwork } = inject('service')

// 扫码
wxwork.JSSDK.config(['scanQRCode']).then(() => {
  wx.scanQRCode({
    desc: 'scanQRCode desc',
    needResult: 0, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
    scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是条形码（一维码），默认二者都有
    success: function (res: any) {
      console.log(res)
    },
    error: function (res: any) {
      console.error(res)
    }
  })
})
```

## isInWxwork()
判断当前环境是否在企业微信内（包括 Pc 端和 App 端）。

##### 类型：
```js
function isInWxwork(): Boolean
```

##### 示例：
```js
const { wxwork } = inject('service')
const isInWxwork = wxwork.isInWxwork()
console.log(isInWxwork)
```

## isInPcWxwork()
判断当前环境是否在企业微信的 Pc 环境内。

##### 类型：
```js
function isInPcWxwork(): Boolean
```

##### 示例：
```js
const { wxwork } = inject('service')
const isInPcWxwork = wxwork.isInPcWxwork()
console.log(isInPcWxwork)
```

## isInAppWxwork()
判断当前环境是否在企业微信的 App 环境内。

##### 类型：
```js
function isInAppWxwork(): Boolean
```

##### 示例：
```js
const { wxwork } = inject('service')
const isInAppWxwork = wxwork.isInAppWxwork()
console.log(isInAppWxwork)
```

