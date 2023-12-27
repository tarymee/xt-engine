<template>
  <div
    class="xt-text"
    :class="[customClass]"
    :style="[viewStyle]"
    :title="value"
  >
    {{ value }}
  </div>
</template>
<script>
import baseMixin from '../common/baseMixin'

export default {
  name: 'xt-text',
  mixins: [baseMixin],
  data () {
    return {
      linenumber: this.returnViewRulePropValue('linenumber', 'number'),
    }
  },
  computed: {
    viewStyle () {
      const style = this.createBaseStyle()
      if (this.linenumber !== '') {
        style['overflow'] = 'hidden'
        style['text-overflow'] = 'ellipsis'
        style['display'] = '-webkit-box'
        style['-webkit-box-orient'] = 'vertical'
        style['-webkit-line-clamp'] = Number(this.linenumber)
      }
      if (this.hidden) {
        style.display = 'none'
      }
      return style
    }
  },
  mounted () {
    this.executeEvent('onload')
  }
}
</script>

<style scoped>
/* todo 做垂直居中 */
.xt-text {

}
</style>
