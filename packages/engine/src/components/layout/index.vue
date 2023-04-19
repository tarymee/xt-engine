<script>
import { get, cloneDeep } from 'lodash-es'
import baseMixin from '../common/baseMixin'
import renderComponent from '../common/renderComponent'
import { viewRuleAddProps, viewRuleAddParentcode, createViewRuleMap, delViewRuleMap } from '../page/dealProtocol'

export default {
  name: 'xt-layout',
  mixins: [baseMixin],
  data () {
    return {
      isContainerCtrl: true,
      content: this.returnViewRulePropValue('content', 'array', []),
    }
  },
  methods: {
    setPropContent (value) {
      // todo
      this.content.forEach((item) => {
        delViewRuleMap(item, this.engine.viewRuleMap)
      })
      this.content = []
      setTimeout(() => {
        const content = cloneDeep(value)
        content.forEach((item) => {
          viewRuleAddProps(item)
        })
        content.forEach((item) => {
          viewRuleAddParentcode(item, this.code, this.codepath)
        })
        content.forEach((item) => {
          createViewRuleMap(item, this.engine.viewRuleMap)
        })
        this.content = content
      }, 0)
    }
  },
  render: function (h) {
    const hasOnclickedEvent = this.eventlist.some((item) => item.trigger === 'onclicked' && item.handler)
    return h(
      'div',
      {
        // props: {
        //   key: this.code
        // },
        attrs: {
          // todo 不要留空格
          class: `xt-layout ${this.customClass}`
        },
        style: hasOnclickedEvent ? {
          ...this.viewStyle,
          cursor: 'pointer'
        } : this.viewStyle,
        on: {
          'click': () => {
            this.handleClick()
          }
        }
      },
      [
        this.content.map((item, i) => {
          return renderComponent(h, item)
        })
      ]
    )
  }
}
</script>

<style scoped>
.xt-layout {
  display: flex;
}
</style>

