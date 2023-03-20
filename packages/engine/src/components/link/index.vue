<template>
  <div
    class="xt-link"
    :style="[viewStyle, viewStyleB]"
    @click="handleClick"
  >
    {{ value }}
  </div>
</template>
<script>
import baseMixin from '../common/baseMixin'

export default {
  name: 'xt-link',
  mixins: [baseMixin],
  data () {
    return {}
  },
  computed: {
    viewStyleB () {
      let style = {}
      style.cursor = 'pointer'
      style.color = '#409EFF'
      return style
    }
  },
  methods: {
    handleClick () {
      // console.log(this.engine)
      // 如果是在table中 则需要等 row-click 执行完毕之后再执行
      if (this.intable) {
        setTimeout(() => {
          this.executeEvent('onclicked')
        }, 0)
      } else {
        this.executeEvent('onclicked')
      }
    }
  }
}
</script>

<style scope>
/* .xt-link {

} */
</style>
