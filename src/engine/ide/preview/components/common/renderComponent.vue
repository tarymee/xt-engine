<script>
import baseMixin from './baseMixin'
import components from '../index'
export default {
  name: 'render-component',
  mixins: [baseMixin],
  render: function (h) {
    return h((components[this.viewRule.type] || components.default), {
      props: {
        viewRule: this.viewRule
      }
    })
  }
}
</script>

<style scope>

</style>
