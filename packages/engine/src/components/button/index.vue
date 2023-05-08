<template>
  <div
    class="xt-button"
    :class="[customClass]"
    :style="[viewStyle]"
  >
    <el-button
      :disabled="readonly"
      :size="eleButtonSize"
      :type="displaytype"
      :icon="icon"
      :plain="plain"
      :round="round"
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
      plain: this.returnViewRulePropValue('plain', 'boolean', false),
      round: this.returnViewRulePropValue('round', 'boolean', false),
      text: this.returnViewRulePropValue('text', 'string'),
      icon: this.returnViewRulePropValue('icon', 'string'),
      size: this.returnViewRulePropValue('size', 'string', 'small') // big middle small mini
    }
  },
  computed: {
    // 兼容 text value
    buttonText () {
      return this.value || this.text
    },
    eleButtonSize () {
      const map = {
        big: '',
        middle: 'medium',
        small: 'small',
        mini: 'mini'
      }
      return map[this.size]
    }
  }
}
</script>

<style scoped>
.xt-button .el-button {
  width: 100%;
}
/* .xt-button:hover {
  color: #FFF;
} */
</style>
