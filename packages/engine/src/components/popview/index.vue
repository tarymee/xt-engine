<script>
import { get, cloneDeep } from 'lodash-es'
import baseMixin from '../common/baseMixin'
import renderComponent from '../common/renderComponent'

export default {
  name: 'xt-popview',
  mixins: [baseMixin],
  data () {
    return {
      isContainerCtrl: true,
      width: this.returnViewRulePropValue('width', 'unit', '50%'),
      wrapwidth: this.returnViewRulePropValue('wrapwidth', 'unit'),
      value: this.returnViewRulePropValue('value', 'other', null),
      fullscreen: this.returnViewRulePropValue('fullscreen', 'boolean')
    }
  },
  computed: {
    // 兼容 width wrapwidth
    popviewWidth () {
      return this.wrapwidth || this.width
    },
    viewStyle () {
      // popview 的 width 和 hidden 应用于 el-dialog 组件
      const style = this.createBaseStyle()
      delete style.width
      delete style.hidden
      return style
    }
  },
  watch: {
    hidden (newValue, oldValue) {
      if (newValue) {
        this.setValue(null)
      }
    }
  },
  mounted () {
    this.executeEvent('onload')
  },
  methods: {
    setPropReadonly (value) {
      // debugger
      // console.log(value)
      this.readonly = value
      const childrenInstace = this.getChildrenInstace()
      childrenInstace.forEach((item) => {
        if (!item.isContainerCtrl) {
          item.setProp('readonly', value)
        } else {
          item.readonly = value
        }
      })
    },
    validata () {
      let res = true
      const childrenInstace = this.getChildrenInstace()
      for (let i = 0, len = childrenInstace.length; i < len; i++) {
        const item = childrenInstace[i]
        if (!item.isContainerCtrl) {
          res = item.validata()
        }
        if (!res) {
          break
        }
      }
      return res
    }
  },
  render: function (h) {
    const content = get(this.viewRule, 'content', [])
    const operations = cloneDeep(get(this.viewRule, 'operations', []))
    return h(
      'el-dialog',
      {
        props: {
          visible: !this.hidden,
          title: this.title,
          width: this.popviewWidth,
          fullscreen: this.fullscreen,
          // modalAppendToBody: false,
          // appendToBody: true,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          destroyOnClose: true,
          // showClose: !this.fullscreen,
          modal: !this.fullscreen,
          customClass: 'xt-popview-wrap' + (this.fullscreen ? ' xt-popview-fullscreen-wrap' : '') + (operations.length ? ' xt-popview-fullscreen-operations-wrap' : '')
        },
        on: {
          'update:visible': (val) => {
            this.hidden = !val
          },
          'closed': () => {
            this.executeEvent('onclose')
          },
          'open': () => {
            this.executeEvent('onopen')
          }
        },
      },
      !this.hidden ? [
        h(
          'div',
          {
            attrs: {
              class: `xt-popview ${this.customClass}`
            },
            style: this.viewStyle,
          },
          [
            content.map((item, i) => {
              return renderComponent(h, item)
            })
          ]
        ),
        operations.length ? h(
          'div',
          {
            slot: 'footer',
            attrs: {
              class: 'xt-popview-footer'
            },
          },
          operations.map((item, i) => {
            return renderComponent(h, item)
          })
        ) : null
      ] : null
    )
  }
}
</script>

<style scoped>
.xt-popview {
  display: flex;
}
.xt-popview-footer {
  display: flex;
  flex-direction: row-reverse;
}
</style>

<style>
.xt-popview-wrap .el-dialog__body{
  padding-top: 20px;
  padding-bottom: 20px;
}

/* 全屏 */
.el-dialog__wrapper:has(> .xt-popview-fullscreen-wrap) {
  position: absolute;
}
.xt-popview-fullscreen-wrap .el-dialog__body {
  overflow: auto;
  height: calc(100% - 54px - 40px);
}
.xt-popview-fullscreen-operations-wrap .el-dialog__body {
  height: calc(100% - 54px - 40px - 62px)!important;
}
.xt-popview-fullscreen-wrap .el-dialog__header {
  background-color: #fafafa;
  /* border: 1px solid #EBEEF5; */
  position: relative;
}
.xt-popview-fullscreen-wrap .el-dialog__header:after {
  content: "";
  display: block;
  height: 1px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #EBEEF5;
}
</style>
