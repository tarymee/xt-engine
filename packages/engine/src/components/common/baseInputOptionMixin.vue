<script>
import { get } from 'lodash-es'
import { Message } from 'element-ui'
import { fixLength } from '../../utils'
import baseInputMixin from './baseInputMixin'

export default {
  mixins: [baseInputMixin],
  data () {
    return {
      options: []
    }
  },
  watch: {
    // todo select tree options 不统一
    options (newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  },
  created () {
    this.dealViewRuleProp('options', 'array', [])
  },
  methods: {

  }
}
</script>

<style scope>

</style>
