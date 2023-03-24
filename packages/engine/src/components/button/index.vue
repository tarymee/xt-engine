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
      {{ buttonText }}
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
      // displaytype https://element.eleme.cn/2.15/#/zh-CN/component/button
      displaytype: this.returnViewRulePropValue('displaytype', 'string'),
      text: this.returnViewRulePropValue('text', 'string')
    }
  },
  computed: {
    // 兼容 text value
    buttonText () {
      return this.value || this.text
    }
  }
}
</script>

<style scope>
.xt-button .el-button {
  width: 100%;
}
</style>
