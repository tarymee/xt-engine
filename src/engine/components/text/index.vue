<template>
  <div
    class="xt-text"
    :style="[viewStyle]"
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

<style scope>
/* .xt-text {

} */
</style>
