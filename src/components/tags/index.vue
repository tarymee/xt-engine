<template>
  <div
    class="xt-tags"
    :class="[customClass]"
    :style="[viewStyle]"
  >
    <template v-for="(item, index) in texts">
      <el-tag
        v-if="item.type !== undefined"
        :key="item.key"
        :type="item.type"
        :effect="item.effect"
        size="small"
        class="xt-tags-item"
      >
        {{ item.text }}
      </el-tag>
      <span v-else :key="index" class="xt-tags-item">
        {{ item.text }}
      </span>
    </template>
  </div>
</template>

<script>
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
      // todo: 仔细测试 优化写法
      let texts = []
      let value = this.value
      if (typeof this.value === 'string' && (this.value.indexOf('[') === 0 || this.value.indexOf('{') === 0)) {
        value = JSON.parse(this.value)
        try {
          value = JSON.parse(this.value)
        } catch (err) {
          console.error(err)
        }
      }

      if (Array.isArray(value)) {
        if (value.length) {
          if (typeof value[0] !== 'object') {
            // 多值 有options属性 value = JSON.stringify(['1', '2'])
            // JSON.stringify(['1', '2'])
            texts = value.map((item) => {
              const obj = this.options.find((item2) => item === item2.key)
              return obj ? obj : {
                text: item,
                key: item
              }
            })
          } else {
            // 多值 无options属性 value = JSON.stringify([{ "key": "1", "text": "启用" }, { "key": "0", "text": "停用" }])
            texts = value
          }
        }
      } else {
        if (Object.prototype.toString.call(value) !== '[object Object]') {
          // 单值 + 有options属性 value = '1'
          const selectOptions = this.options.find((item) => item.key === value)
          texts = selectOptions ? [selectOptions] : [
            {
              text: value,
              key: value
            }
          ]
        } else {
          // 单值 + 无options属性 value = JSON.stringify({ "key": "1", "text": "启用" })
          texts = [value]
        }
      }
      return texts
    }
  },
  mounted () {
    this.executeEvent('onload')
  }
}
</script>

<style scoped>
.xt-tags>.xt-tags-item {
  margin-right: 5px;
}
.xt-tags>.xt-tags-item:last-child {
  margin-right: 0px;
}
</style>
