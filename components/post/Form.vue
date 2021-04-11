<template>
  <ValidationObserver ref="observer" v-slot="{handleSubmit, invalid, reset}">
    <form
      class="flex flex-col space-y-2"
      @submit.prevent="handleSubmit(onSubmitFactory(reset))"
    >
      <PostTimer />
      <PostText />
      <PostAttachment />
      <br><br>
      <Button v-show="!isEdit" :disabled="invalid" type="submit">
        Поставить в очередь
      </Button>
      <div class="flex space-x-4">
        <Button v-show="isEdit" :disabled="invalid" type="submit">
          Сохранить
        </Button>
        <Button v-show="isEdit" @click="$emit('createPost')">
          Создать новый
        </Button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
export default {
  name: 'PostForm',

  props: {
    isEdit: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  methods: {
    onSubmitFactory (reset) {
      const self = this
      return () => {
        self.$emit('queuePost')
        reset()
      }
    }
  }
}
</script>
