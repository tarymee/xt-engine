<script>
import { get, cloneDeep } from 'lodash-es'
import { fixLength } from '../../utils'
import baseMixin from '../common/baseMixin'
import renderComponent from '../common/renderComponent'

export default {
  name: 'xt-popview',
  mixins: [baseMixin],
  data () {
    return {
      width: fixLength(this.viewRule.width),
    }
  },
  computed: {
    viewStyle () {
      // popview 的 width 和 hidden 应用于 el-dialog 组件
      const style = this.createBaseStyle()
      delete style.width
      delete style.hidden
      return style
    }
  },
  methods: {
    validata () {
      // console.log(this.engine.ctrlCodeMap)
      // debugger
      let res = true
      for (var [key, item] of this.engine.ctrlCodeMap) {
        if (item.$$inpopview) {
          // todo 可以去掉 item.isinputctrl || item.type === 'table' 判断
          if (item.isinputctrl || item.type === 'table') {
            res = item.validata()
          }
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
    const operations = get(this.viewRule, 'operations', [])
    // const operationsReverse = cloneDeep(operations).reverse()
    const operationsClone = cloneDeep(operations)
    return h(
      'el-dialog',
      {
        props: {
          visible: !this.hidden,
          title: this.title,
          width: this.width,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          destroyOnClose: true,
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
              class: 'xt-popview'
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
          // operationsClone.map((item, i) => {
          //   return h('el-button', {
          //     props: {
          //       type: i === (operationsClone.length - 1) ? 'primary' : ''
          //     },
          //     on: {
          //       'click': () => {
          //         console.log(this)
          //         this.executeEvent('onclicked')
          //       }
          //     },
          //   }, item.value)
          // })
          operationsClone.map((item, i) => {
            item.displaytype = (i === 0 ? 'primary' : '')
            return renderComponent(h, item)
          })
        ) : null,
        // h(
        //   'div',
        //   {
        //     slot: 'title',
        //     attrs: {
        //       class: 'dialog-title'
        //     },
        //   },
        //   this.title
        // )
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

