<template>
  <div
    class="xt-image"
    :class="[customClass]"
    :style="[viewStyle]"
  >
    <el-image
      :style="elImageStyle"
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
      fit: this.returnViewRulePropValue('fit', 'string', 'fill')
    }
  },
  computed: {
    elImageStyle () {
      const style = {
        width: '100%'
      }
      if (this.viewStyle.height) {
        style.height = '100%'
      }
      return style
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
