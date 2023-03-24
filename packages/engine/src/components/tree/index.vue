<template>
  <div
    class="xt-input xt-tree"
    :class="{ 'xt-tree-navigation': displaytype === 'navigation' }"
    :style="[viewStyle]"
  >
    <div
      v-if="!infilter && !intable && displaytype !== 'navigation' && titlewidth !== '0px' && titlewidth !== '0%' && titlewidth !== '0'"
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
        v-if="intermediateselectmode !== 'individual'"
        v-model="valueText"
        v-popover:popover
        size="small"
        :disabled="true"
        :placeholder="placeholder"
      >
        <template
          #suffix
        >
          <i class="el-input__icon el-icon-arrow-down" />
        </template>
      </el-input>
      <div v-else v-popover:popover class="xt-tree-input">
        <div class="xt-tree-input-icon">
          <i class="el-icon-arrow-down" />
        </div>
        <div v-for="(item, index) in valueTextArr" :key="index" class="xt-tree-input-item">
          {{ item.name }}
          <i v-if="!readonly" class="xt-tree-input-item-close el-icon-close" @click="delItem(index)"></i>
        </div>
        <div v-if="!valueTextArr.length" class="xt-tree-input-placeholder">{{ placeholder }}</div>
      </div>
      <!-- todo 宽度基于控件宽度 -->
      <el-popover
        ref="popover"
        :disabled="readonly"
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
      intermediateselectmode: this.returnViewRulePropValue('intermediateselectmode', 'string', ''),
      displaytype: this.returnViewRulePropValue('displaytype', 'string', 'custom'), // navigation | custom
      // noexpand allexpand rootexpand
      expandmodel: this.returnViewRulePropValue('expandmodel', 'string', 'rootexpand'),
      valueText: '',
      valueTextArr: [],
      highlightCurrent: true,
      expandOnClickNode: false,
      options: this.returnViewRulePropValue('options', 'array', []),
      // treeData: [],
      multiselectable: this.returnViewRulePropValue('multiselectable', 'boolean'),
      defaultProps: {
        children: 'children',
        label: 'name',
        disabled: 'disabled'
      }
    }
  },
  computed: {
    treeData () {
      // if (this.code === 'tree-145454') {
      //   console.log('treeData')
      // }
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
    }
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
    if (this.intermediateselectmode === '') {
      if (this.multiselectable) {
        this.intermediateselectmode = 'gather'
      } else {
        this.intermediateselectmode = 'individual'
      }
    }
  },
  mounted () {
    if (this.multiselectable) {
      this.setValue(this.value || [])
    } else {
      this.setValue(this.value || null)
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
        // 赋值options之后马上setValue不成功 因为需要转换treeData
        this.value = value
        // if (this.code === 'tree-145454') {
        //   // console.log(this)
        //   console.log('setValue')
        // }
        this.$refs.tree.setCurrentKey(this.value || null)
      }
      this.dealValueText()
    },
    // getTreeData (options) {
    //   const treeData = this.listToTree(options, {
    //     idKey: 'id',
    //     pidKey: 'parentid',
    //     childrenKey: 'children'
    //   })
    //   this.treeData = treeData
    // },
    // setProp (type, value, setter) {
    //   if (type === 'value') {
    //     this.setValue(value, setter)
    //   } else {
    //     this[type] = cloneDeep(value)
    //     if (type === 'options') {
    //       this.treeData = this.getTreeData(this.options)
    //     }
    //   }
    // },
    dealValueText () {
      if (this.multiselectable) {
        const selectOptions = this.options.filter((item) => {
          return this.value.some((item2) => item2 === item.id)
        })
        this.valueText = selectOptions.map((item) => item.name).join('，')
        this.valueTextArr = selectOptions
      } else {
        const valueNode = this.options.find((item) => {
          return item.id === this.value
        })
        this.valueText = valueNode ? valueNode.name : ''
        this.valueTextArr = valueNode ? [valueNode] : []
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
      // console.log(this.$refs.popover)
      // console.log(this.$refs.popover.value)
      // if (!this.$refs.popover.value) {
      //   this.$refs.popover && this.$refs.popover.doShow()
      // } else {
      //   this.$refs.popover && this.$refs.popover.doClose()
      // }
      // // 只读模式下 如果选择人员为空 则不打开弹窗
      // if (this.readonly && !this.$refs.popover.value) {
      //   setTimeout(() => {
      //     this.$refs.popover && this.$refs.popover.doClose()
      //   }, 0)
      // }
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
    },
    delItem (index) {
      // console.log(item, index)
      this.valueTextArr.splice(index, 1)
      // console.log(this.valueTextArr)
      const value = this.valueTextArr.map((item) => item.id)
      // console.log(value)
      if (this.multiselectable) {
        this.setValue(value)
      } else {
        this.setValue(value.length ? value[0] : '')
      }
      this.executeEvent('onvaluechange')
    }
  }
}
</script>

<style scope>
.xt-tree .el-input.is-disabled .el-input__inner {
  background-color: #FFF;
  border-color: #DCDFE6;
  color: #606266;
  cursor: pointer;
}
/* 三角形大一点 */
.xt-tree .el-tree-node__content>.el-tree-node__expand-icon {
  font-size: 16px;
  padding: 4px 8px;
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

.xt-tree-input {
  overflow: hidden;
  border: 1px solid #DCDFE6;
  padding: 0 30px 0 0;
  min-height: 30px;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
}
.xt-tree-input-icon {
  height: 12px;
  width: 30px;
  font-size: 12px;
  text-align: center;
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -6px;
}
.xt-tree-input-placeholder {
  color: #ccc;
  line-height: 30px;
  font-size: 13px;
  padding-left: 15px;
}
.xt-tree-input-item {
  float: left;
  font-size: 13px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  padding: 0 5px;
  line-height: 20px;
  margin: 4px 0 4px 5px;
  border-radius: 2px;
}
.xt-tree-input-item-close {
  cursor: pointer;
}
</style>
