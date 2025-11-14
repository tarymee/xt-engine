import axios from 'axios'
import loading from './loading'
import { get } from 'lodash-es'
import { decrypt } from './crypt'


// _encrydata
export const normalizeEncryData = (response) => {
  if (response.data && response.data._encrydata && typeof response.data._encrydata === 'string') {
    const res = decrypt(response.data._encrydata)
    try {
      const resJson = JSON.parse(res)
      response.data = {
        ...resJson
      }
    } catch (e) {
      response.data = res
    }
  }
  if (response.body && response.body._encrydata && typeof response.body._encrydata === 'string') {
    const res = decrypt(response.body._encrydata)
    try {
      const resJson = JSON.parse(res)
      response.body = {
        ...resJson
      }
    } catch (e) {
      response.body = res
    }
  }

  return response
}

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
  normalizeEncryData(response)
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
