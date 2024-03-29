<script>
import { Message } from 'element-ui'
import baseMixin from './baseMixin'

export default {
  mixins: [baseMixin],
  data () {
    return {
      isInputCtrl: true,
      required: this.returnViewRulePropValue('required', 'boolean'),
      placeholder: this.returnViewRulePropValue('placeholder', 'string'),
      hiddenclearbtn: this.returnViewRulePropValue('hiddenclearbtn', 'boolean'),
      titlewidth: this.returnViewRulePropValue('titlewidth', 'unit', '30%'),
    }
  },
  methods: {
    requiredValidata () {
      let res = true
      const value = this.getValue()
      if (this.required && !this.hidden && (value === '' || (Array.isArray(value) && !value.length))) {
        res = false
        Message({
          message: `${this.title}不能为空`,
          type: 'error'
        })
      }
      return res
    },
    // 输入型控件校验方法
    validata () {
      return this.requiredValidata()
    }
  }
}
</script>

<style>
.xt-input {
  display: flex;
  padding: 0 8px 8px;
  box-sizing: border-box;
}
.xt-input-intable {
  padding: 0;
}
.xt-input-label {
  box-sizing: border-box;
  flex: none;
  font-weight: bold;
  text-align: right;
  font-size: 12px;
  color: #48576a;
  line-height: 32px;
  height: 32px;
  white-space: nowrap;
  word-wrap: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-right: 8px;
  width: 30%;
}
.xt-input-label span {
  color: #f00;
  margin-right: 2px;
}
.xt-input-content {
  flex: 1;
}

.xt-input .el-input {
  width: 100%!important;
}
.xt-input .el-select {
  width: 100%!important;
}
.xt-input .el-date-editor {
  width: 100%!important;
}
.xt-input .el-cascader {
  width: 100%!important;
}
.xt-input .el-input.is-disabled .el-input__inner,
.xt-input .el-textarea.is-disabled .el-textarea__inner {
  color: #606266;
}
.xt-input .el-textarea .el-textarea__inner {
  font-family: initial;
}


.xt-input .el-checkbox__input.is-disabled.is-checked+.el-checkbox__label {
  color: #606266;
}
.xt-input .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  border-color: #aaa;
}
.xt-input .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
  border-color: #606266;
}
.xt-input .el-radio__input.is-checked.is-disabled+span.el-radio__label {
  color: #606266;
}
.xt-input .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
  background-color: #606266;
}
.xt-input .el-radio__input.is-disabled.is-checked .el-radio__inner {
  background-color: #F5F7FA;
  border-color: #aaa;
}

/* todo 垂直 简化等模式 */
.xt-input-vertical {
  flex-direction: column;
}
.xt-input-vertical .xt-input-label {
  flex: none;
  text-align: left;
  font-size: 12px;
  color: #48576a;
  line-height: 24px;
  padding-right: 0px;
  width: 100%;
}
</style>
