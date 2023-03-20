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
      displaytype: ''
    }
  },
  created () {
    this.dealViewRuleProp('displaytype', 'string')
  },
  methods: {
    handleClick () {
      // console.log(this.parentViewRule)
      // console.log(this.engine)
      // 如果是在table中 则需要等 row-click 执行完毕之后再执行
      if (this.intable) {
        setTimeout(() => {
          this.executeEvent('onclicked')
        }, 0)
      } else {
        this.executeEvent('onclicked')
      }
    }
  }
}
</script>

<style scope>
.xt-button .el-button {
  width: 100%;
}
</style>
