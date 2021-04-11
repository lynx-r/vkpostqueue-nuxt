<template>
  <div class="h-full flex flex-col">
    <LayoutHeader class="flex-none" />
    <ReAuthRequiredIn class="absolute inset-x-0 top-16 text-center" />
    <main class="container mx-auto flex-grow bg-gray-50 p-4 shadow-sm">
      <nuxt />
    </main>
    <LayoutFooter class="flex-none" />
  </div>
</template>

<style>
</style>
<script>
export default {
  name: 'LayoutDefault'
}
</script>
