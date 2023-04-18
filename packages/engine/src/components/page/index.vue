<script>
import { get } from 'lodash-es'
import { dealProtocol } from './dealProtocol'
// import engineMap from './engineMap'
import EventManager from '../../event'
import renderComponent from '../common/renderComponent'
// import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'xt-page',
  provide () {
    return {
      engine: this
    }
  },
  props: {
    protocol: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data: function () {
    const protocolData = dealProtocol(this.protocol)
    return {
      protocolFormat: protocolData.protocolFormat,
      pagecode: protocolData.pagecode,
      title: protocolData.title,
      viewRuleMap: protocolData.viewRuleMap,
      ctrlCodeMap: new Map(),
      ctrlNameCodeMap: new Map(),
      eventManager: null
    }
  },
  created: function () {
    // console.log(this.protocol)
    // console.log(this.protocolFormat)
    // console.log(this.viewRuleMap)
    this.eventManager = new EventManager({
      engine: this
    })
    // engineMap.set(this.pagecode, this)
  },
  mounted () {
    // 如果这段代码放在 created 里 切换页面时先执行 destroy 先移除类 再 created 添加类 添加不上
    document.body.classList.add('xt-engine-wrapper')

    this.eventManager.init()
  },
  destroy () {
    document.body.classList.remove('xt-engine-wrapper')
  },
  render: function (h) {
    const body = get(this.protocolFormat, 'view.body')
    const subviews = get(this.protocolFormat, 'view.subviews', [])
    return h(
      'div',
      {
        attrs: {
          class: 'xt-engine xt-page',
        },
        directives: [
          // {
          //   name: 'loading',
          //   value: this.loading,
          //   // modifiers: {
          //   //   // fullscreen: true,
          //   //   lock: true
          //   // }
          // }
        ]
      },
      [
        renderComponent(h, body),
        subviews.map((item) => {
          return renderComponent(h, item)
        })
      ]
    )
  }
}

</script>

<style scoped>
.xt-engine {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  position: relative;
}
</style>

<style>
/* 修改 loading 遮罩层层级 以免被其他覆盖 */
.xt-engine-wrapper .xt-engine-loading {
  z-index: 999999;
}
/* 解决弹窗信息被 el-dialog 覆盖的问题 两者初始化 z-index 都是 2000 但不共享 z-index 导致 */
.xt-engine-wrapper .el-message {
  z-index: 99999!important;
}
.xt-engine-wrapper .el-message-box__wrapper {
  z-index: 9999!important;
  background-color: rgba(000, 000, 000, 0.5);
}
/* .xt-engine-wrapper .el-message-box__wrapper + .v-modal {
  z-index: 9998!important;
} */
</style>
