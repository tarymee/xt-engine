import axios from 'axios'
// import { get } from 'lodash-es'
// import { ElMessage } from 'element-plus'
// import loadding from './loadding/index'

const axiosInstance = axios.create({
  // timeout: 36000000
  // withCredentials: true, // 不能开启 影响ali oss
  // headers: {
  //   'Content-Type': 'application/json;charset=UTF-8'
  // }
})

// axiosInstance.interceptors.request.use(config => {
//   const isShowLoadding = get(config, 'isShowLoadding', true)
//   isShowLoadding && loadding.open()

//   const token = lsProxy.getItem('token')
//   if (config.headers && config.headers.common && token) {
//     (config.headers.common as any).token = token
//   }
//   return config
// }, error => {
//   return Promise.reject(error)
// })

// axiosInstance.interceptors.response.use((response: any) => {
//   const isShowLoadding = get(response, 'config.isShowLoadding', true)
//   isShowLoadding && loadding.close()
//   return response
// }, (err: any) => {
//   // console.log(err)
//   const isShowLoadding = get(err, 'config.isShowLoadding', true)
//   isShowLoadding && loadding.close()

//   const errorCode = get(err, 'response.data.error_code')
//   const errorStatusText = get(err, 'response.statusText')
//   const errorMessage = get(err, 'message', '网络异常，请稍后重试。')
//   const msg = errorCode || errorStatusText || errorMessage
//   // debugger
//   ElMessage.error(msg)
//   return Promise.reject(err)
// })

export default axiosInstance
