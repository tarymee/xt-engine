import components, { register } from './src/components'
import { provide } from './src/event/flycode'
import axios from './src/service/axios'
import ElementUI from 'element-ui'
// import { Button } from 'element-ui'

function installElement (Vue) {
  import('element-ui/lib/theme-chalk/index.css')
  Vue.use(ElementUI)
  // // console.log(Button)
  // // 判断全局组件是否已注册
  // if (!Vue.component(Button.name)) {
  //   Vue.use(Button)
  // }
}

// vue 安装插件
function install (Vue, options) {
  // console.log(Vue)
  // console.log(Vue.prototype)
  // console.log(options)
  // debugger

  if (install.installed) return
  install.installed = true

  installElement(Vue)

  Vue.component('xt-engine', components.engine)

  // Vue.prototype.$xtEngine = () => {
  //   console.log('$xtEngine')
  // }

  const component = options?.component
  if (component) {
    for (const x in component) {
      register(x, component[x])
    }
  }

  const flycode = options?.flycode
  if (flycode) {
    for (const x in flycode) {
      provide(x, flycode[x])
    }
  }
}

const xtEngine = {
  // 导出引擎的axios实例以便用户修改配置以及注册拦截器
  // todo 改成接受传入 axios 实例 然后再注册引擎本身的拦截器
  axios,
  provideFlycode: provide,
  registerComponent: register,
  install
}

const components$1 = {
  page: components.engine,
  baseMixin: components.baseMixin,
  baseInputMixin: components.baseInputMixin
}

export {
  xtEngine as default,
  xtEngine,
  // 导出 components 兼容旧版本用法
  components$1 as components
}
