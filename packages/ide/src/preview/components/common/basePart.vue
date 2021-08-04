<template>
  <div class="pre-ctrl-basepart">
    <div
      class="pre-ctrl-th"
      :class="{ 'pre-ctrl-th-focus': isFocused }"
      @click="handleClick"
    >
      <i
        v-if="isContainerCtrl"
        class="pre-ctrl-icon"
        :class="{
          'el-icon-caret-bottom' : !isContentHidden,
          'el-icon-caret-right' : isContentHidden
        }"
        @click="handleContentToggle"
      >
      </i>
      <i class="pre-ctrl-icon" :class="{ 'el-icon-reading': isContainerCtrl, 'el-icon-collection-tag': !isContainerCtrl }"></i>
      {{ viewRule.title }}({{ viewRule.type }})
      <div v-if="type !== 'body'" class="pre-ctrl-th-r">
        <span
          class="pre-ctrl-th-r-btn"
          style="color: #58C982"
          title="向下复制一个与该控件相同的同级控件"
          @click.stop="copyCtrl"
        >
          [复制]
        </span>
        <span
          class="pre-ctrl-th-r-btn"
          style="color: #F86637"
          title="删除该控件"
          @click.stop="delCtrl"
        >
          [删除]
        </span>
      </div>
    </div>


    <div v-if="isContainerCtrl" v-show="!isContentHidden" class="pre-ctrl-tb">
      <draggable
        v-model="viewRule.content"
        group="site"
        animation="300"
      >
        <pre-render-component
          v-for="(item) in (viewRule.content || [])"
          :key="item.code"
          :view-rule="item"
        >
        </pre-render-component>
      </draggable>

      <div
        v-if="!viewRule.content || !viewRule.content.length"
        class="pre-ctrl-tb-none"
      >
        <i class="pre-ctrl-icon el-icon-collection-tag"></i>
        请添加控件
      </div>
    </div>
  </div>
</template>
<script>
import { get, cloneDeep } from 'lodash-es'
import draggable from 'vuedraggable'
import renderComponent from './renderComponent.vue'

export default {
  inject: {
    pageVM: {
      from: 'pageVM',
      default: null
    }
  },
  components: {
    'draggable': draggable,
    'pre-render-component': renderComponent
  },
  props: {
    viewRule: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      isContentHidden: false,
      value: '',
      code: '',
      title: '',
      // name: '',
      // type: '',
      // eventlist: [],
      // readonly: false,
      // hidden: false,
      // $$intable: false,
      // $$infilter: false,
      // $$inpopview: false,
      // $$notMap: false,
    }
  },
  computed: {
    isFocused () {
      return !!this.pageVM && this.code === this.pageVM.curCtrlCode
    },
    isContainerCtrl () {
      return Array.isArray(this.viewRule.content)
    }
  },
  created () {
    // this.value = get(this, 'viewRule.value', '')
    this.type = get(this, 'viewRule.type', '')
    this.code = get(this, 'viewRule.code', '')
    this.title = get(this, 'viewRule.title', '')
    // this.name = get(this, 'viewRule.name', '')
    // todo 如果是string 表示是fylcode 要执行
    // this.eventlist = get(this, 'viewRule.eventlist', [])
    // this.readonly = get(this, 'viewRule.readonly', false)
    // this.hidden = get(this, 'viewRule.hidden', false)
    // this.$$intable = get(this, 'viewRule.$$intable', false)
    // this.$$infilter = get(this, 'viewRule.$$infilter', false)
    // this.$$inpopview = get(this, 'viewRule.$$inpopview', false)
    // this.$$notMap = get(this, 'viewRule.$$notMap', false)
  },
  methods: {
    handleClick () {
      this.pageVM.curCtrlCode = this.code
    },
    handleContentToggle () {
      this.isContentHidden = !this.isContentHidden
      // this.$emit('contentToggle', this.isContentHidden)
    },
    copyCtrl () {
      this.pageVM.copyCtrl(this.code)
    },
    delCtrl (e) {
      this.pageVM.delCtrl(this.code)
    }
  }
}
</script>
