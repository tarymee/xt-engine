<template>
  <div class="ide-preview">
    <pre-layout :view-rule="viewProtocol.body"></pre-layout>
    <pre-layout
      v-for="item in viewProtocol.subviews"
      :key="item.code"
      :view-rule="item"
    >
    </pre-layout>
  </div>
</template>
<script>
import preComponents from './components'

export default {
  name: 'preview',
  components: {
    'pre-layout': preComponents.layout
  },
  props: {
    viewProtocol: {
      type: Object,
      default: function  () {
        return {}
      }
    }
  }
}
</script>
