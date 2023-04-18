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
    return {}
  }
}
</script>

<style scoped>
/* todo 做垂直居中 */
.xt-text {

}
</style>
