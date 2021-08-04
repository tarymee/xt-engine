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
      type: '',
      code: '',
      title: '',
      // eventlist: [],
      // readonly: false,
      // hidden: false,
      // $$intable: false,
      // $$infilter: false,
      // $$inpopview: false,
      // $$notMap: false,
    }
  },
  created () {
    this.type = get(this, 'viewRule.type', '')
    this.code = get(this, 'viewRule.code', '')
    this.title = get(this, 'viewRule.title', '')
  },
  methods: {

  }
}
</script>
