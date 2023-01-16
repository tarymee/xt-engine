<script>
import { get } from 'lodash-es'
import baseMixin from '../common/baseMixin'
import renderComponent from '../common/renderComponent'

export default {
  name: 'xt-filter',
  mixins: [baseMixin],
  data () {
    return {}
  },
  created () {

  },
  methods: {},
  render: function (h) {
    const context = this
    let basic = []
    if (context.viewRule.searchcondition && context.viewRule.searchcondition.basic) {
      basic = context.viewRule.searchcondition.basic
    }
    return h(
      'div',
      {
        attrs: {
          class: 'xt-filter'
        },
        style: context.viewStyle,
      },
      [
        basic.map((item, i) => {
          // 代理事件
          let filterEventlist = context.viewRule.eventlist || []
          if (filterEventlist.length) {
            const filterHasOnvaluechange = filterEventlist.some((item) => {
                return item.trigger === 'onvaluechange' && item.handler
            })
            if (filterHasOnvaluechange) {
              let eventlist = get(item, 'eventlist', [])
              const itemHasNoOnvaluechange = eventlist.every((item) => {
                  return item.trigger !== 'onvaluechange' || !item.handler
              })
              if (itemHasNoOnvaluechange) {
                item.eventlist = eventlist.concat(filterEventlist)
              }
            }
          }
          return renderComponent(h, item)
        })
      ]
    )
  }
}
</script>

<style scoped>
.xt-filter {
  flex: none;
  display: flex;
  background-color: #eee;
  box-sizing: border-box;
  border: 1px solid #EBEEF5;
  border-bottom: none;
}
</style>

