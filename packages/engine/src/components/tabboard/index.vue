<script>
import { get, cloneDeep } from 'lodash-es'
import { fixLength } from '../../utils'
import baseMixin from '../common/baseMixin'
import renderComponent from '../common/renderComponent'

export default {
  name: 'xt-tabboard',
  mixins: [baseMixin],
  data () {
    return {
      width: fixLength(this.viewRule.width),
      index: 0,
      currentTitle: ''
    }
  },
  computed: {
    viewStyle () {
      // tabboard 的 width 和 hidden 应用于 el-dialog 组件
      const style = this.createBaseStyle()
      delete style.width
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
  created() {
      this.currentTitle = this.viewRule.cards[this.index || 0].title || ''
  },
  methods: {
    // todo 这里有bug 两个tabboard同时打开的话 校验会出错
    validata () {
      // console.log(this.engine.ctrlCodeMap)
      // debugger
      let res = true
      for (var [key, item] of this.engine.ctrlCodeMap) {
        if (item.$$intabboard) {
          // todo 可以去掉 item.isInputCtrl || item.type === 'table' 判断
          if (item.isInputCtrl || item.type === 'table') {
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
    const _this = this
    const cards = get(this.viewRule, 'cards', [])
    return h(
      'div',
      {
        class: {
          'xt-tabboard': true
        },
        style: this.viewStyle
      },
      [
        h(
          'el-tabs',
          {
            props: {
              value: this.currentTitle || ''
            },
            on: {
              input (newVal) {
                console.log(newVal)
                if (_this.currentTitle !== newVal) {
                  _this.currentTitle = newVal
                  _this.index = cards.findIndex((item) => {
                    return item.title === newVal
                  })
                }
              },
              'tab-click' (tab, event) {
                _this.executeEvent('onvaluechange')
              }
            }
          },
          [
            cards.map((item) => {
              let isHidden = item.hidden === '1'
              return h(
                'el-tab-pane',
                {
                  props: {
                    // 如果是初始化就隐藏的tab 其标题用-占位 因为真正隐藏该tab是要在mounted之后 不要让用户一开始就看到隐藏tab的标题
                    // 不用空值占位是因为eleme的el-tab-pane如果是用空值做标题 样式会有问题
                    label: !isHidden ? item.title : '-',
                    name: item.title
                  },
                  key: item.title
                },
                [
                  // item.content.map((item2) => {
                  //   return renderComponent(h, item2)
                  // })
                  renderComponent(h, item)
                ]
              )
            })
          ]
        )
      ]
    )
  }
}
</script>

<style scoped>
.xt-tabboard {
  display: flex;
}
.xt-tabboard-footer {
  display: flex;
  flex-direction: row-reverse;
}
</style>

