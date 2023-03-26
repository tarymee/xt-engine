import components from './src/components'
import flycodeVariable from './src/event/flycode/flycodeVariable'
import Flycode from './src/event/flycode'
import axios from 'axios'
// import axios from './src/service/axios.js'

const xtEngine = {
  // 导出引擎的axios实例以便用户修改配置以及注册拦截器
  axios,
  // use: function () {
  // },
  // 为 flycode 提供变量/函数 在 flycode 中通过 inject[name] 获取
  provideFlycode (name, data) {
    flycodeVariable[name] = data
    if (Flycode.inject[name]) {
      console.error(`您已注入 flycode： ${name}，不可重复注入。`)
    } else {
      Flycode.inject[name] = data
    }
  },
  registerComponent (name, vm) {
    if (components[name]) {
      console.error(`引擎已存在 ${name} 组件，请更换组件 name 值。`)
    } else {
      components[name] = vm
    }
  }
}

export {
  xtEngine,
  components
}
