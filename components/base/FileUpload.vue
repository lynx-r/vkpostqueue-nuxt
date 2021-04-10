<template>
  <ValidationProvider
    v-slot="{ errors }"
    ref="provider"
    :rules="rules"
    class="flex flex-col"
  >
    <label for="input">{{ label }}</label>
    <input
      id="input"
      ref="input"
      type="file"
      class="bg-blue-300 rounded p-2 shadow"
      multiple
      @change="validate"
    >
    <span v-show="!_.isEmpty(errors)" class="text-red-500 text-sm">{{ errors[0] }}</span>
    <span v-show="_.isEmpty(errors)" class="text-sm">&nbsp;</span>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'FileUpload',

  props: {
    label: {
      type: String,
      required: false,
      default: 'Прикрепить файл'
    },
    rules: {
      type: String,
      required: true
    }
  },

  methods: {
    async validate ($event) {
      const { valid } = await this.$refs.provider.validate($event)
      if (!valid) {
        this.resetInput()
        return
      }
      this.$emit('change', $event.target.files)
    },

    resetInput () {
      this.$refs.input.value = ''
      this.$refs.provider.syncValue('')
      this.$refs.provider.validate()
    }
  }
}
</script>

<style scoped>

</style>
