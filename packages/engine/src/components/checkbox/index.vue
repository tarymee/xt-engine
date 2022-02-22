<template>
  <div
    class="xt-input xt-checkbox"
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
      <el-checkbox-group
        v-model="value"
        :disabled="readonly"
        class="xt-checkbox-group"
        :class="{ 'xt-checkbox-group-vertical': displaytype === 'vertical' }"
        @change="handleChange"
      >
        <el-checkbox
          v-for="(item, index) in options"
          :key="index"
          :label="item.key"
        >
          {{ item.text }}
        </el-checkbox>
      </el-checkbox-group>

      <!-- <el-button @click="test">sss</el-button> -->
    </div>
  </div>
</template>
<script>
import baseInputMixin from '../common/baseInputMixin'

export default {
  name: 'xt-checkbox',
  mixins: [baseInputMixin],
  data () {
    return {
      value: [],
      options: [],
      displaytype: '' // vertical || horizontal
    }
  },
  created () {
    this.dealViewRuleProp('value', 'array', [])
    this.dealViewRuleProp('options', 'array', [])
    this.dealViewRuleProp('displaytype', 'string', 'horizontal')
  },
  methods: {
    handleChange (e) {
      this.executeEvent('onvaluechange')
    },
    test (e) {
      console.log(this.value)
    }
  }
}
</script>

<style scope>
/* .xt-checkbox {

} */
.xt-checkbox-group {
  padding: 6px 0;
}
.xt-checkbox-group .el-checkbox {
  /* line-height: 20px; */
}
.xt-checkbox-group-vertical .el-checkbox {
  display: block;
  margin-right: 0;
}
</style>
