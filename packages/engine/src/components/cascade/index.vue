<template>
  <div
    class="xt-input xt-cascade"
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
      <el-cascader
        v-model="value"
        size="small"
        :disabled="readonly"
        :placeholder="placeholder"
        :clearable="!hiddenclearbtn"
        :options="cascadeData"
        filterable
        :props="defaultProps"
        @change="handleChange"
      />
    </div>
  </div>
</template>
<script>
import { get, cloneDeep } from 'lodash-es'
import baseInputMixin from '../common/baseInputMixin'

export default {
  name: 'xt-cascade',
  mixins: [baseInputMixin],
  data () {
    return {
      options: [],
      defaultProps: {
        expandTrigger: 'hover',
        value: 'key',
        label: 'text',
        children: 'children'
      }
    }
  },
  computed: {
    cascadeData () {
      return this.listToTree(this.options, {
        idKey: 'key',
        pidKey: 'parentid',
        childrenKey: 'children'
      })
    }
  },
  created () {
    this.options = get(this.viewRule, 'options', [])
    this.setValue(this.value)
  },
  methods: {
    handleChange () {
      this.executeEvent('onvaluechange')
    },
    listToTree (list, setting) {
      let idKey = setting.idKey
      let pidKey = setting.pidKey
      let childrenKey = setting.childrenKey

      const obj = {}
      const re = []
      // 将数组中数据转为键值对结构 (这里的数组和obj会相互引用)
      list.map((el) => {
        obj[el[idKey]] = el
      })
      // debugger
      for (let i = 0, len = list.length; i < len; i++) {
        const pid = list[i][pidKey]
        if (!pid) {
          // 如果pid为空 说明是根节点
          re.push(list[i])
        } else {
          // 如果pid不为空 则寻找父级 如果没父级 则判定为根节点
          var isin = list.some((item) => {
            return item[idKey] === pid
          })
          if (!isin) {
            re.push(list[i])
          }
        }
        if (obj[pid]) {
          if (obj[pid][childrenKey]) {
            obj[pid][childrenKey].push(list[i])
          } else {
            obj[pid][childrenKey] = [list[i]]
          }
        }
      }
      return re
    },
    getValue (getter) {
      return (this.value && this.value.length) ? cloneDeep(this.value) : []
    },
    setValue (value, setter) {
      value ? this.value = cloneDeep(value) : this.value = []
    }
  }
}
</script>

<style scope>

</style>
