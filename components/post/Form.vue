<template>
  <ValidationObserver ref="observer" v-slot="{handleSubmit, invalid, reset}">
    <form
      class="flex flex-col flex"
      @submit.prevent="handleSubmit(onSubmit) && reset()"
    >
      <PostTimer />
      <PostText />
      <PostAttachment />
      <Button :disabled="invalid">
        Поставить в очередь
      </Button>
    </form>
  </ValidationObserver>
</template>

<script lang="ts">

import { defineComponent } from '@nuxtjs/composition-api'
import { mapFields } from 'vuex-map-fields'

export default defineComponent({
  name: 'PostForm',

  computed: {
    ...mapFields('post', ['resetForm'])
  },

  methods: {
    onSubmit () {
      this.$emit('queuePost')
    }
  }
})
</script>
