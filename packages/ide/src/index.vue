<template>
  <div class="ide-ui">
    <div class="ide-ui-l">
      <ctrllist></ctrllist>
    </div>
    <div class="ide-ui-m">
      <preview :view-protocol="protocol.view"></preview>
      <el-button @click="test">protocol</el-button>
      <el-button @click="test2">PageVM</el-button>
    </div>
    <div class="ide-ui-r">
      <configuration :cur-ctrl-view-rule="curCtrlViewRule"></configuration>
    </div>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash-es'
import protocol from './protocol.json'
import ctrllist from './ctrllist'
import preview from './preview'
import configuration from './configuration'
import { v4 as uuidv4 } from 'uuid'
import { utils } from './service'

export default {
  provide () {
    return {
      pageVM: this
    }
  },
  components: {
    'ctrllist': ctrllist,
    'preview': preview,
    'configuration': configuration
  },
  data () {
    return {
      protocol: protocol,
      curCtrlCode: '',
      curCtrlProp: []
    }
  },
  computed: {
    curCtrlViewRule () {
      console.log('curCtrlViewRule')
      const codeCtrl = this.findViewRule(this.curCtrlCode)
      return codeCtrl ? codeCtrl.viewRule : null
    }
  },
  methods: {
    test () {
      console.log(this.protocol.view.body)
    },
    test2 () {
      console.log(this)
      console.log(this.curCtrlViewRule)
    },
    createCodeCtrlMap (codeCtrlMap, viewRule, parentCode = null) {
      if (!codeCtrlMap.get(viewRule.code)) {
        codeCtrlMap.set(viewRule.code, {
          viewRule: viewRule,
          parentCode: parentCode
        })
      }
      (viewRule.content && viewRule.content.length) && viewRule.content.forEach((item) => {
        this.createCodeCtrlMap(codeCtrlMap, item, viewRule.code)
      })
    },
    findViewRule (ctrlCode) {
      const codeCtrlMap = new Map()
      this.createCodeCtrlMap(codeCtrlMap, this.protocol.view.body)
      this.protocol.view.subviews.forEach((item) => {
        this.createCodeCtrlMap(codeCtrlMap, item)
      })
      // console.log(codeCtrlMap)
      return codeCtrlMap.get(ctrlCode)
    },
    findParentContent (ctrlCode) {
      const codeCtrl = this.findViewRule(ctrlCode)
      let parentContent = null
      if (codeCtrl) {
        if (codeCtrl.parentCode) {
          parentContent = this.findViewRule(codeCtrl.parentCode).viewRule.content
        } else {
          // 没有 parentCode 的情况是 body 或者 popview
          if (codeCtrl.viewRule.type === 'popview') {
            parentContent = this.protocol.view.subviews
          }
        }
      }
      return parentContent
    },
    addCtrl (item) {
      // console.log(item)
      const ctrlViewRule = {
        ...cloneDeep(item),
        code: uuidv4()
      }
      let parentContent
      if (ctrlViewRule.type === 'popview') {
        parentContent = this.protocol.view.subviews
      } else {
        if (this.curCtrlCode) {
          const curCtrl = this.findViewRule(this.curCtrlCode)
          if (Array.isArray(curCtrl.viewRule.content)) {
            parentContent = curCtrl.viewRule.content
          } else {
            parentContent = this.findParentContent(this.curCtrlCode)
          }
        } else {
          parentContent = this.protocol.view.body.content
        }
      }

      parentContent.push(ctrlViewRule)
      // console.log(ctrlViewRule)
    },
    copyCtrl (ctrlCode) {
      let parentContent = this.findParentContent(ctrlCode)
      if (parentContent) {
        const index = parentContent.findIndex((item) => item.code === ctrlCode)
        const codeCtrl = this.findViewRule(ctrlCode)
        parentContent.splice(index + 1, 0, utils.copyNewViewRule(codeCtrl.viewRule))
      }
    },
    delCtrl (ctrlCode) {
      let parentContent = this.findParentContent(ctrlCode)
      if (parentContent) {
        const index = parentContent.findIndex((item) => item.code === ctrlCode)
        parentContent.splice(index, 1)
      }
      if (ctrlCode === this.curCtrlCode) {
        this.curCtrlCode = ''
      }
    },
    propertyChange (property, val) {
      console.log('propertyChange')
      const codeCtrl = this.findViewRule(this.curCtrlCode)
      if (codeCtrl) {
        codeCtrl.viewRule[property] = val
      }
    }
  }
}
</script>

<style>
@import url('./assets/css/style.css');
</style>
