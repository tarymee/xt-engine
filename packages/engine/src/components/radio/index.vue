<template>
  <div
    class="xt-input xt-radio"
    :class="{ 'xt-input-intable': $$intable }"
    :style="[viewStyle]"
  >
    <div
      v-if="!$$infilter && !$$intable && titlewidth !== '0px' && titlewidth !== '0%' && titlewidth !== '0'"
      class="xt-input-label"
      :style="{ width: titlewidth }"
    >
      <span v-if="required">*</span>{{ title }}
    </div>
    <div class="xt-input-content">
      <el-radio-group
        v-model="value"
        :disabled="readonly"
        class="xt-radio-group"
        :class="{ 'xt-radio-group-vertical': displaytype === 'vertical' }"
        @change="handleChange"
      >
        <el-radio
          v-for="(item, index) in options"
          :key="index"
          :label="item.key"
        >
          {{ item.text }}
        </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>
<script>
import baseInputMixin from '../common/baseInputMixin'

export default {
  name: 'xt-radio',
  mixins: [baseInputMixin],
  data () {
    return {
      options: [],
      displaytype: '' // vertical | horizontal
    }
  },
  created () {
    this.dealViewRuleProp('options', 'array', [])
    this.dealViewRuleProp('displaytype', 'string', 'horizontal')
  },
  methods: {
    handleChange (e) {
      this.executeEvent('onvaluechange')
    }
  }
}
</script>

<style scope>
/* .xt-radio {

} */
.xt-radio-group {
  display: block!important;
  padding: 6px 0;
}
.xt-radio-group .el-radio {
  line-height: 20px;
}
.xt-radio-group-vertical .el-radio {
  display: block;
  margin-right: 0;
}
</style>
