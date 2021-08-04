<template>
  <div class="pre-ctrl">
    <pre-base-part :view-rule="viewRule"></pre-base-part>
  </div>
</template>

<script>
import baseMixin from '../common/baseMixin'
import basePart from '../common/basePart'

export default {
  name: 'pre-default',
  components: {
    'pre-base-part': basePart
  },
  mixins: [baseMixin]
}
</script>
