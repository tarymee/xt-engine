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
      value: null,
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
  watch: {
    hidden (newValue, oldValue) {
      if (newValue) {
        this.setValue(null)
      }
    }
  },
  created () {
    this.dealViewRuleProp('value', 'other', null)
  },
  methods: {
    findAllChildrenCtrlCode (ctrlViewRule, codes = []) {
      if (ctrlViewRule.code !== this.code) {
        codes.push(ctrlViewRule.code)
      }
      for (const x in ctrlViewRule) {
        let item = ctrlViewRule[x]
        if (Object.prototype.toString.call(item) === '[object Object]' && item.type) {
          this.findAllChildrenCtrlCode(item, codes)
        } else if (Array.isArray(item)) {
          item.forEach((item2) => {
            if (Object.prototype.toString.call(item2) === '[object Object]' && item2.type) {
              this.findAllChildrenCtrlCode(item2, codes)
            }
          })
        }
      }
      return codes
    },
    validata () {
      // console.log(this.engine.ctrlCodeMap)
      // console.log(this.engine)
      // console.log(this)
      const allChildrenCtrlCode = this.findAllChildrenCtrlCode(this.viewRule)
      // console.log(allChildrenCtrlCode)
      // debugger
      let res = true
      for (var [key, item] of this.engine.ctrlCodeMap) {
        // console.log(key, item)
        const inThisPopview = allChildrenCtrlCode.some((item) => item === key)
        if ((item.inpopview && inThisPopview) && (item.isInputCtrl || item.type === 'table')) {
          res = item.validata()
        }
        if (!res) {
          // debugger
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
          operations.map((item, i) => {
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

