<script>
import { get } from 'lodash-es'
import { Message } from 'element-ui'
import { utils } from '@xt/service'
import baseMixin from './baseMixin'

export default {
  mixins: [baseMixin],
  data () {
    return {
      isinputctrl: true,
      required: false,
      placeholder: '',
      hiddenclearbtn: false,
      titlewidth: '30%',
    }
  },
  created () {
    this.required = get(this, 'viewRule.required', false)
    this.placeholder = get(this, 'viewRule.placeholder', '')
    this.hiddenclearbtn = get(this, 'viewRule.hiddenclearbtn', false)
    this.titlewidth = utils.fixLength(get(this, 'viewRule.titlewidth', '')) || '30%'
  },
  methods: {
    requiredValidata () {
      let res = true
      const value = this.getValue()
      if (this.required && !this.hidden && value === '') {
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

<style scope>
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
