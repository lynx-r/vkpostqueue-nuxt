<template>
  <header class="h-16 flex items-center space-x-12 bg-blue-300 shadow-lg px-8 mb-8">
    <NuxtLink to="/" exact>
      Главная
    </NuxtLink>
    <NuxtLink to="/post/list">
      Объявления в очереди
    </NuxtLink>
    <NuxtLink to="/post/create">
      Создать объявление
    </NuxtLink>
  </header>
</template>

<style lang="scss" scoped>
@import "assets/css/colors.scss";

/* home route and active route will show in bold as it matches / and /about */
a.nuxt-link-active {
  font-weight: bold;
}

/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  color: $lightBlue-700;
}

a:hover {
  color: $lightBlue-600;
}
</style>
