import components from './src/components'
import flycodeVariable from './src/event/flycode/flycodeVariable'
const xtComponents = components


const xtEngine = {
  use: function () {
    
  },
  // 为flycode注入变量 与Page一样的用法
  registerFlycode (name, data) {
    flycodeVariable[name] = data
  },
  registerComponent (name, vm) {
    components[name] = vm
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
