<template>
  <div
    class="xt-default"
    :class="[customClass]"
    :style="[viewStyle]"
  >
    {{ type }} 控件暂未实现
  </div>
</template>
<script>
import baseMixin from '../common/baseMixin'

export default {
  name: 'xt-default',
  mixins: [baseMixin],
  data () {
    return {}
  },
  mounted () {
    this.executeEvent('onload')
  },
  methods: {}
}
</script>

<style scoped>
/* .xt-default {

} */
</style>
