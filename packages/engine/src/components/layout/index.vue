<script>
import { get, cloneDeep } from 'lodash-es'
import baseMixin from '../common/baseMixin'
import renderComponent from '../common/renderComponent'

export default {
  name: 'xt-layout',
  mixins: [baseMixin],
  data () {
    return {}
  },
  methods: {},
  render: function (h) {
    const content = get(this.viewRule, 'content', [])
    const hasOnclickedEvent = this.eventlist.some((item) => item.trigger === 'onclicked' && item.handler)
    return h(
      'div',
      {
        attrs: {
          class: 'xt-layout'
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
        content.map((item, i) => {
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

