<script>
import { get } from 'lodash-es'
import baseMixin from '../common/baseMixin'
import renderComponent from '../common/renderComponent'

export default {
  name: 'xt-filter',
  mixins: [baseMixin],
  data () {
    return {
      isContainerCtrl: true,
      bindcallbtn: this.returnViewRulePropValue('bindcallbtn', 'boolean'), // 独立查询按钮
    }
  },
  render: function (h) {
    let searchcondition = get(this.viewRule, 'searchcondition')
    let basic = get(searchcondition, 'basic', [])
    return h(
      'div',
      {
        attrs: {
          class: `xt-filter ${this.customClass}`
        },
        style: this.viewStyle,
      },
      searchcondition ? [
        basic.map((item, i) => {
          if (!this.bindcallbtn) {
            // 代理事件
            const hasOnvaluechange = this.eventlist.some((item) => {
              return item.trigger === 'onvaluechange' && item.handler
            })
            if (hasOnvaluechange) {
              let eventlist = get(item, 'eventlist', [])
              const itemHasNoOnvaluechange = eventlist.every((item) => {
                return item.trigger !== 'onvaluechange' || !item.handler
              })
              if (itemHasNoOnvaluechange) {
                item.eventlist = eventlist.concat(this.eventlist)
              }
            }
          }
          return renderComponent(h, item)
        }),
        this.bindcallbtn ? h(
          'el-button',
          {
            style: {
              'margin-left': '8px',
              'margin-bottom': '8px'
            },
            props: {
              // plain: true,
              // type: 'primary',
              size: 'small'
            },
            on: {
              'click': (e) => {
                this.executeEvent('onvaluechange')
              }
            }
          },
          '查询'
        ): null
      ] : null
    )
  }
}
</script>

<style scoped>
.xt-filter {
  flex: none;
  display: flex;
  background-color: #fafafa;
  box-sizing: border-box;
  border: 1px solid #EBEEF5;
  border-bottom: none;
}
</style>

