<script>
import { get, cloneDeep } from 'lodash-es'

export default {
  inject: {
    pageVM: {
      from: 'pageVM',
      default: null
    }
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
      property: '',
      value: '',
      code: '',
      title: '',
      type: '',
      placeholder: '',
      readonly: false
    }
  },
  created () {
    this.property = get(this, 'viewRule.property', '')
    this.code = get(this, 'viewRule.code', '')
    this.title = get(this, 'viewRule.title', '')
    this.type = get(this, 'viewRule.type', '')
    this.placeholder = get(this, 'viewRule.placeholder', '')
    this.readonly = get(this, 'viewRule.readonly', false)
  },
  methods: {
    getValue (getter) {
      return cloneDeep(this.value)
    },
    setValue (value, setter) {
      this.value = cloneDeep(value)
    }
  }
}
</script>
