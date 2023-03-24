<template>
  <div
    class="xt-button"
    :style="[viewStyle]"
  >
    <el-button
      :disabled="readonly"
      size="small"
      :type="displaytype"
      :icon="viewRule.icon"
      @click="handleClick"
    >
      {{ value }}
    </el-button>
  </div>
</template>
<script>
import baseMixin from '../common/baseMixin'

export default {
  name: 'xt-button',
  mixins: [baseMixin],
  data () {
    return {
      displaytype: this.returnViewRulePropValue('displaytype', 'string')
    }
  },
  created () {
  },
  methods: {

  }
}
</script>

<style scope>
.xt-button .el-button {
  width: 100%;
}
</style>
