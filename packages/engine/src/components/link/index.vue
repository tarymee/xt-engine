<template>
  <div
    class="xt-link"
    :class="[customClass]"
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
  }
}
</script>

<style scoped>
/* .xt-link {

} */
</style>
