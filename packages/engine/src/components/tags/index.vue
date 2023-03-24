<template>
  <div
    class="xt-tags"
    :style="[viewStyle]"
  >
    <div
      v-for="(item, index) in texts"
      :key="index"
      class="xt-tags-item"
    >
      {{ item }}
    </div>
    <!-- todo: 使用 el-tag 支持 color -->
    <!-- <el-tag
      v-for="(item, index) in texts"
      :key="index"
      size="mini"
    >
      {{ item }}
    </el-tag> -->
  </div>
</template>
<script>
import { get, cloneDeep } from 'lodash-es'
import baseMixin from '../common/baseMixin'

export default {
  name: 'xt-tags',
  mixins: [baseMixin],
  data () {
    return {
      options: this.returnViewRulePropValue('options', 'array', [])
    }
  },
  computed: {
    texts () {
      // 单值 + 有options属性
      const dealSingle = (value) => {
        // console.log(value)
        // debugger
        const selectOptions = this.options.filter((item) => item.key === value)
        // debugger
        return selectOptions.map(item => item.text)
      }

      // todo: 仔细测试 优化写法
      let texts = []
      let valueJson = this.value
      if (typeof this.value === 'string' && (this.value.indexOf('[') === 0 || this.value.indexOf('{') === 0)) {
        valueJson = JSON.parse(this.value)
        try {
          valueJson = JSON.parse(this.value)
        } catch (err) {
          console.error(err)
        }
      }

      if (Array.isArray(valueJson)) {
        if (!valueJson.length) {
          texts = []
        } else {
          if (typeof valueJson[0] !== 'object') {
            // 多值 + 有options属性，json对象字符串
            texts = valueJson.map((item) => {
              return this.options.find((item2) => item === item2.key) || item
            })
          } else {
            // 多值 + 无options属性，json对象字符串
            texts = valueJson.map(item => item.text)
          }
        }
      } else {
        if (Object.prototype.toString.call(valueJson) !== '[object Object]') {
          texts = dealSingle(valueJson)
        } else {
          // 单值 + 无options属性，json对象字符串
          texts = [valueJson].map(item => item.text)
        }
      }
      return texts
    }
  },
  created () {
  },
  methods: {}
}
</script>

<style scope>
/* .xt-text {

} */
</style>
