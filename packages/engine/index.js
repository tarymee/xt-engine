import components from './src/components'
import Flycode from './src/event/flycode'
// import axios from 'axios'
import axios from './src/service/axios'

const xtEngine = {
  // 导出引擎的axios实例以便用户修改配置以及注册拦截器
  axios,
  // use: function () {
  // },
  // 为 flycode 提供变量/函数 在 flycode 中通过 inject[name] 获取
  provideFlycode (name, data) {
    // 有可能传入的是字符串 后期可能会改 所以要支持可变动
    if (Flycode.inject[name]) {
      console.warn(`您已注入 flycode： ${name}，重复注入会覆盖上一次的值。`)
    }
    Flycode.inject[name] = data
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
