<template>
  <div
    class="xt-input xt-select"
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
      <!-- :collapse-tags="multiselectable" -->
      <el-select
        v-model="value"
        size="small"
        :multiple="multiselectable"
        :placeholder="placeholder"
        filterable
        :clearable="!hiddenclearbtn"
        :disabled="readonly"
        @change="handleChange"
      >
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.text"
          :value="item.key"
        />
      </el-select>
    </div>
  </div>
</template>
<script>
import { get, cloneDeep } from 'lodash-es'
import baseInputMixin from '../common/baseInputMixin'

export default {
  name: 'xt-select',
  mixins: [baseInputMixin],
  data () {
    return {
      options: [],
      multiselectable: false,
    }
  },
  computed: {},
  created () {
    this.options = get(this.viewRule, 'options', [])
    this.computeBooleanProp('multiselectable')
    this.setValue(this.value)
  },
  methods: {
    handleChange () {
      console.log(this.value)
      this.executeEvent('onvaluechange')
    },
    getValue (getter) {
      if (this.multiselectable) {
        return (this.value && this.value.length) ? JSON.stringify(this.value) : ''
      } else {
        return this.value
      }
    },
    setValue (value, setter) {
      if (this.multiselectable) {
        if (value) {
          try {
            this.value = JSON.parse(value)
          } catch (err) {
            console.error(err)
            this.value = []
          }
        } else {
          this.value = []
        }
      } else {
        this.value = value
      }
    },
  }
}
</script>

<style scope>
/* .xt-text {

} */
</style>
