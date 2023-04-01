import axios from 'axios'
import loading from './loading'
import { get } from 'lodash-es'

const axiosInstance = axios.create({
  // timeout: 36000000
  // withCredentials: true, // 不能开启 影响ali oss
  // headers: {
  //   'Content-Type': 'application/json;charset=UTF-8'
  // }
})

axiosInstance.interceptors.request.use(config => {
  const isShowLoading = get(config, 'isShowLoading', true)
  isShowLoading && loading.open()
  // console.log('axiosInstance.interceptors.request')

  return config
}, error => {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use((response) => {
  const isShowLoading = get(response, 'config.isShowLoading', true)
  isShowLoading && loading.close()
  return response
}, (err) => {
  // console.log(err)
  const isShowLoading = get(err, 'config.isShowLoading', true)
  isShowLoading && loading.close()
  return Promise.reject(err)
})

export default axiosInstance
