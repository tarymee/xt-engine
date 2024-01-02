# URLQuery 链接参数
H5 引擎支持通过在链接上拼接内置的 URLQuery 参数来获得某些能力。

------

## isdebugger 手机端调试
H5 引擎支持通过 vConsole 进行手机端页面调试，它是一个轻量、可拓展、针对手机网页的前端开发者调试面板。

在链接上拼接 isdebugger=1，即可开启 vConsole 调试工具。

比如：http://101.200.205.231:7000/h5/#/?isdebugger=1

| 值 | 说明 |
| :---- | :---- |
| 1 | 开启 |
| 0 | 不开启(默认) |

该 URLQuery 参数会记录在本次会话的 sessionStorage 里，页面前进或后退依然有效，关掉页面会自动清除掉该信息，不会有副作用。


## isshowhead 隐藏头部
H5 引擎支持通过设置 URLQuery 参数来隐藏头部。

比如把 H5 页面嵌到 小程序/APP 里面时，在 小程序/APP 已有自己头部情况下，就需要隐藏 H5 本身的头部了。

在链接上拼接 isshowhead=0，即可实现隐藏头部。

比如：http://101.200.205.231:7000/h5/#/?isshowhead=0

| 值 | 说明 |
| :---- | :---- |
| 1 | 不隐藏头部(默认) |
| 0 | 隐藏头部 |

该 URLQuery 参数会记录在本次会话的 sessionStorage 里，页面前进或后退依然有效，关掉页面会自动清除掉该信息，不会有副作用。


## whennotloggedisautojumplogin 未登录时是否自动跳转登录页
当访问 H5 页面时，H5 引擎会校验用户是否登录，默认情况下，如果检测到用户未登录时会自动跳转登录页。

也可对改能力进行自定义，在链接上拼接 whennotloggedisautojumplogin=0，即可实现未登录时不跳转登录页。

比如：http://101.200.205.231:7000/h5/#/?whennotloggedisautojumplogin=0

| 值 | 说明 |
| :---- | :---- |
| 1 | 未登录时自动跳转登录页(默认) |
| 0 | 未登录时不跳转登录页 |

该 URLQuery 参数会记录在本次会话的 sessionStorage 里，页面前进或后退依然有效，关掉页面会自动清除掉该信息，不会有副作用。


## ispermission 不校验权限




## token 单点登录
