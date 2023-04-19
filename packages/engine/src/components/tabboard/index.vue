<script>
import { get, cloneDeep } from 'lodash-es'
import baseMixin from '../common/baseMixin'
import renderComponent from '../common/renderComponent'

export default {
  name: 'xt-tabboard',
  mixins: [baseMixin],
  data () {
    return {
      isContainerCtrl: true,
      index: 0,
      currentTitle: ''
    }
  },
  computed: {
    viewStyle () {
      const style = this.createBaseStyle()
      return style
    }
  },
  created() {
    this.currentTitle = this.viewRule.cards[this.index || 0].title || ''
  },
  mounted () {
    this.dealHeight()
    this.dealTabHidden()
  },
  methods: {
    dealHeight () {
      if (this.viewStyle.height) {
        this.$el.querySelector('.el-tabs__content').style = `height: calc(100% - 55px);overflow: auto;`
        // this.$el.querySelectorAll('.el-tab-pane').forEach(element => {
        //   element.style = `height: 100%;overflow: auto;`
        // })
      }
    },
    dealTabHidden () {
      this.$nextTick(() => {
        if (this.$el && this.$el.querySelectorAll('.el-tabs__item')) {
          let cards = (this.viewRule.cards || [])
          for (let i = 0, len = cards.length; i < len; i++) {
            let isHidden = cards[i].hidden === '1'
            const elTabsItem = this.$el.querySelectorAll('.el-tabs__item')[i]
            if (elTabsItem) {
              if (isHidden) {
                elTabsItem.style.display = 'none'
              } else {
                elTabsItem.style.display = 'inline-block'
              }
            }
          }
        }
      })
    },
    // todo 校验tabboard内的控件 校验不通过切换到该tab？
    validata () {
      return true
    }
  },
  render: function (h) {
    const _this = this
    const cards = get(this.viewRule, 'cards', [])
    return h(
      'div',
      {
        attrs: {
          class: `xt-tabboard ${this.customClass}`
        },
        style: this.viewStyle
      },
      [
        h(
          'el-tabs',
          {
            props: {
              type: '',
              style: {
                height: '300px'
              },
              value: this.currentTitle || ''
            },
            on: {
              input (newVal) {
                // console.log(newVal)
                if (_this.currentTitle !== newVal) {
                  _this.currentTitle = newVal
                  _this.index = cards.findIndex((item) => {
                    return item.title === newVal
                  })
                  // console.log(_this.index)
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
  /* display: flex; */
}
.xt-tabboard .el-tabs {
  height: 100%;
}
.xt-tabboard .el-tab-pane {
  height: 100%;
  overflow: auto;
}
</style>

