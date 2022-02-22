import components from './src/components'
import flycodeVariable from './src/event/flycode/flycodeVariable'
import axios from 'axios'
const xtComponents = components


const xtEngine = {
  // 导出全局的axios以便用户修改配置以及注册拦截器
  // todo: 不要导出全局 有可能容器应用本身就用了全局的 axios
  axios,
  // use: function () {
  // },
  // 为flycode注入变量 与Page一样的用法
  registerFlycode (name, data) {
    flycodeVariable[name] = data
  },
  registerComponent (name, vm) {
    components[name] = vm
  },
  registerIcon (name, vm) {
    components[name] = vm
  },
  registerImage (name, imgurl) {
    components[name] = imgurl
  }
}



export default {
  xtEngine,
  components,
  xtComponents
}

export {
  xtEngine,
  components,
  xtComponents
}
