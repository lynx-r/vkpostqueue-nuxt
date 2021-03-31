<template>
  <ValidationProvider
    v-slot="{ errors }"
    ref="provider"
    :rules="rules"
    class="flex flex-col"
  >
    <span>{{ label }}</span>
    <input
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
  name: 'FileInput',

  props: {
    label: {
      type: String,
      required: false,
      default: 'Прикрепить файл'
    },
    rules: {
      type: String,
      required: true
    },
    resetInputFlag: {
      type: Boolean,
      required: false,
      default: false
    },
    immediate: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  watch: {
    resetInputFlag () {
      this.resetInput()
    }
  },

  methods: {
    async validate ($event) {
      const { valid } = await this.$refs.provider.validate($event)
      if (valid) {
        this.$emit('change', $event.target.files)
        return
      }
      this.resetInput()
    },

    resetInput () {
      this.$refs.input.value = ''
    }
  }
}
</script>

<style scoped>

</style>
