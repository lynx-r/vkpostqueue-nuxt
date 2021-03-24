<template>

</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: '<%= name.pascalCase %>',
  props: [],
  setup() {
    return {}
  }
})
</script>
<% if (scoped) { %>
<style scoped>
<% } else { %>
<style>
<% } %>
</style>
