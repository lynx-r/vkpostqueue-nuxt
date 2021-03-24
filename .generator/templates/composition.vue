<template>

</template>

<script lang="ts">
import { defineNuxtConfig } from '@nuxtjs/composition-api'

export default defineNuxtConfig({
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
