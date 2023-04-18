<template>
  <div
    class="xt-image"
    :class="[customClass]"
    :style="[viewStyle]"
  >
    <el-image
      style="width: 100%; height: 100%"
      :src="value"
      :fit="fit"
    >
    </el-image>
  </div>
</template>
<script>
import baseMixin from '../common/baseMixin'

export default {
  name: 'xt-image',
  mixins: [baseMixin],
  data () {
    return {
      // 可通过fit确定图片如何适应到容器框，同原生 object-fit。
      // ['fill', 'contain', 'cover', 'none', 'scale-down']
      fit: this.returnViewRulePropValue('fit', 'string', 'cover')
    }
  },
  created () {
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
