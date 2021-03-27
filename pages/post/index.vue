<template>
  <div class="container">
    <NuxtLink to="list">Список</NuxtLink>
    <NuxtLink to="create">Создать</NuxtLink>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Post',
  middleware: 'auth',
}
</script>
