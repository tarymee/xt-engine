<template>
  <div
    class="xt-input xt-tree"
    :class="{ 'xt-tree-navigation': displaytype === 'navigation' }"
    :style="[viewStyle]"
  >
    <div
      v-if="!$$infilter && !$$intable && displaytype !== 'navigation' && titlewidth !== '0px' && titlewidth !== '0%' && titlewidth !== '0'"
      class="xt-input-label"
      :style="{ width: titlewidth }"
    >
      <span v-if="required">*</span>{{ title }}
    </div>
    <div
      v-if="displaytype !== 'navigation'"
      class="xt-input-content"
    >
      <!-- todo 处理readonly样式和逻辑 -->
      <el-input
        v-model="valueText"
        v-popover:popover
        size="small"
        :disabled="true"
        :placeholder="placeholder"
      >
        <template
          #suffix
        >
          <i
            class="el-input__icon el-icon-arrow-down"
          />
        </template>
      </el-input>
      <el-popover
        ref="popover"
        placement="bottom"
        width="200"
        trigger="click"
        @show="handlePopoverShow"
      >
        <el-tree
          ref="tree"
          class="xt-tree-tree"
          :data="treeData"
          node-key="id"
          :default-expand-all="expandmodel === 'allexpand'"
          :default-expanded-keys="defaultExpandedKeys"
          check-on-click-node
          empty-text="暂无数据"
          :show-checkbox="multiselectable"
          :check-strictly="multiselectable && intermediateselectmode === 'individual'"
          :highlight-current="highlightCurrent"
          :expand-on-click-node="expandOnClickNode"
          :props="defaultProps"
          @check="handleCheck"
          @node-click="handleNodeClick"
        />
      </el-popover>
    </div>

    <el-tree
      v-if="displaytype === 'navigation'"
      ref="tree"
      class="xt-tree-navigation-tree"
      :data="treeData"
      node-key="id"
      :default-expand-all="expandmodel === 'allexpand'"
      :default-expanded-keys="defaultExpandedKeys"
      check-on-click-node
      empty-text="暂无数据"
      :show-checkbox="multiselectable"
      :check-strictly="multiselectable && intermediateselectmode === 'individual'"
      :highlight-current="highlightCurrent"
      :expand-on-click-node="expandOnClickNode"
      :props="defaultProps"
      @check="handleCheck"
      @node-click="handleNodeClick"
    />
  </div>
</template>
<script>
import { get, cloneDeep } from 'lodash-es'
import baseInputMixin from '../common/baseInputMixin'

export default {
  name: 'xt-tree',
  mixins: [baseInputMixin],
  data () {
    return {
      // intermediateselectmode(取值模式)：
      // 多选时
      // individual (父子无关联 各自独立取值)
      // disable (父子有关联 不能选非叶子节点 取值叶子节点)
      // shortcut (父子有关联 取值叶子节点)
      // gather (父子有关联 共同取值 半选不取 默认)
      // related (父子有关联 取值非叶子节点 如果只有一级 最高节点同样也是叶子节点时 则该级视为最高级 要取值 半选不取)
      // todo highest (父子有关联 取值最高节点)
      // 单选时
      // individual (父子无关联 各自独立取值 默认)
      // disable (不能选非叶子节点 取值叶子节点) 暂不实现
      intermediateselectmode: '',
      displaytype: 'custom', // navigation | custom
      // noexpand allexpand rootexpand
      expandmodel: 'rootexpand',
      valueText: '',
      highlightCurrent: true,
      expandOnClickNode: false,
      options: [],
      multiselectable: false,
      defaultProps: {
        children: 'children',
        label: 'name',
        disabled: 'disabled'
      }
    }
  },
  computed: {
    treeData () {
      const treeData = this.listToTree(this.options, {
        idKey: 'id',
        pidKey: 'parentid',
        childrenKey: 'children'
      })
      console.log(treeData)
      return treeData
    },
    defaultExpandedKeys () {
      const keys = []
      if (this.expandmodel === 'rootexpand') {
        this.treeData.forEach((item) => {
          keys.push(item.id)
        })
      }
      return keys
    },
    // valueText () {
    //   if (this.multiselectable) {
    //     const selectOptions = this.options.filter((item) => {
    //       return this.value.some((item2) => item2 === item.id)
    //     })
    //     return selectOptions.map((item) => item.name).join('，')
    //   } else {
    //     const valueNode = this.options.find((item) => {
    //       return item.id === this.value
    //     })
    //     return valueNode ? valueNode.name : ''
    //   }
    // },
  },
  created () {
    // todo autofillvalue
    this.options = get(this.viewRule, 'options', [])
    this.multiselectable = get(this.viewRule, 'multiselectable', false)
    this.expandmodel = get(this.viewRule, 'expandmodel', 'rootexpand')
    this.displaytype = this.viewRule.displaytype || 'custom'
    if (this.multiselectable) {
      this.intermediateselectmode = this.viewRule.intermediateselectmode || 'gather'
    } else {
      this.intermediateselectmode = this.viewRule.intermediateselectmode || 'individual'
    }
  },
  mounted () {
    if (this.multiselectable) {
      this.setValue(this.viewRule.value || [])
    } else {
      this.setValue(this.viewRule.value || null)
    }
  },
  methods: {
    getValue (getter) {
      const component = get(getter, 'ctrl.component', 'id')
      if (this.multiselectable) {
        if (this.value && this.value.length) {
          const selectOptions = this.options.filter((item) => {
            return this.value.some((item2) => item2 === item.id)
          })
          if (component === 'fullvalue') {
            return selectOptions
          } else {
            return selectOptions.map((item) => item[component])
          }
        } else {
          return []
        }
      } else {
        const valueNode = cloneDeep(this.options.find((item) => {
          return item.id === this.value
        }))
        if (component === 'fullvalue') {
          return valueNode ? valueNode : ''
        } else {
          return valueNode ? valueNode[component] : ''
        }
      }
    },
    setValue (value, setter) {
      value = cloneDeep(value)
      if (this.multiselectable) {
        // value = JSON.stringify(['111'])
        if (!value) {
          value = []
        } else {
          if (!Array.isArray(value)) {
            console.error('tree 赋值格式不正确 多选时接受数组')
            value = []
          }
        }
        // todo 这个如果设置的值不符合 intermediateselectmode 给出提示
        this.$refs.tree.setCheckedKeys(value)
        this.value = this.getCheckValue()
      } else {
        this.value = value
        this.$refs.tree.setCurrentKey(this.value || null)
      }
      this.dealValueText()
    },
    dealValueText () {
      if (this.multiselectable) {
        const selectOptions = this.options.filter((item) => {
          return this.value.some((item2) => item2 === item.id)
        })
        this.valueText = selectOptions.map((item) => item.name).join('，')
      } else {
        const valueNode = this.options.find((item) => {
          return item.id === this.value
        })
        this.valueText =  valueNode ? valueNode.name : ''
      }
    },
    // 单选
    handleNodeClick (data, node, vm) {
      if (!this.multiselectable) {
        // console.log('handleNodeClick')
        // console.log(data)
        // console.log(node)
        // console.log(vm)
        if (this.value === data.id) {
          this.value = null
          this.$refs.tree.setCurrentKey(null)
        } else {
          this.value = data.id
        }
        this.dealValueText()
        this.executeEvent('onvaluechange')
      }
    },
    // 多选
    handleCheck (data, checked) {
      if (this.multiselectable) {
        // console.log('handleCheck')
        // console.log(data, checked)
        this.value = this.getCheckValue()
        this.dealValueText()
        this.executeEvent('onvaluechange')
      }
    },
    getCheckValue () {
      // debugger
      if (this.multiselectable) {
        // getCheckedNodes(leafOnly, includeHalfChecked) 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false
        if (this.intermediateselectmode === 'individual' || this.intermediateselectmode === 'gather') {
          const checkedNodes = this.$refs.tree.getCheckedNodes()
          return checkedNodes.map((item) => item.id)
        } else if (this.intermediateselectmode === 'shortcut' || this.intermediateselectmode === 'disable') {
          const checkedNodes = this.$refs.tree.getCheckedNodes(true)
          return checkedNodes.map((item) => item.id)
        } else if (this.intermediateselectmode === 'related') {
          let checkedNodes = this.$refs.tree.getCheckedNodes()
          // console.log(checkedNodes)
          // 剔除叶子节点
          checkedNodes = checkedNodes.filter((item) => ((item.children && item.children.length) || !item.parentid))
          return checkedNodes.map((item) => item.id)
        }
      }
    },
    handleInputClick (e) {
      // console.log(e)
      // e.stopPropagation()
      // e.preventDefault()
      // console.log(this.$refs.popover.value)
      // setTimeout(() => {
      //     console.log(this.$refs.popover.value)
      // }, 1000)

      // 只读模式下 如果选择人员为空 则不打开弹窗
      if (this.readonly && !this.$refs.popover.value) {
        setTimeout(() => {
          this.$refs.popover && this.$refs.popover.doClose()
        }, 0)
      }
    },
    handlePopoverShow () {
      // this.loadSource()
    },
    listToTree (list, setting) {
      const listCopy = cloneDeep(list)
      let idKey = setting.idKey
      let pidKey = setting.pidKey
      let childrenKey = setting.childrenKey

      const obj = {}
      const re = []
      // 将数组中数据转为键值对结构 (这里的数组和obj会相互引用)
      listCopy.map((el) => {
        obj[el[idKey]] = el
      })
      // debugger
      for (let i = 0, len = listCopy.length; i < len; i++) {
        const pid = listCopy[i][pidKey]
        if (!pid) {
          // 如果pid为空 说明是根节点
          re.push(listCopy[i])
        } else {
          // 如果pid不为空 则寻找父级 如果没父级 则判定为根节点
          var isin = listCopy.some((item) => {
            return item[idKey] === pid
          })
          if (!isin) {
            re.push(listCopy[i])
          }
        }
        if (obj[pid]) {
          if (obj[pid][childrenKey]) {
            obj[pid][childrenKey].push(listCopy[i])
          } else {
            obj[pid][childrenKey] = [listCopy[i]]
          }
        }
      }
      return re
    }
  }
}
</script>

<style scope>
.xt-tree .el-input.is-disabled .el-input__inner {
  background-color: #FFF;
  border-color: #DCDFE6;
  color: #606266;
  cursor: default;
}
.xt-tree-tree {
  overflow: auto;
  min-height: 200px;
  max-height: 350px;
}
.xt-tree-navigation {
  padding: 0;
  height: 100%;
  overflow: auto;
}
.xt-tree-navigation-tree {
  overflow: auto;
  width: 100%;
  height: 100%;
}

</style>
