<script>
import { get } from 'lodash-es'
import { Message } from 'element-ui'
import baseInputMixin from './baseInputMixin'

export default {
  mixins: [baseInputMixin],
  data () {
    return {
      options: this.returnViewRulePropValue('options', 'array', [])
    }
  },
  watch: {
    // todo select tree options 不统一
    options (newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  },
  created () {
  },
  methods: {

  }
}
</script>

<style scope>

</style>
