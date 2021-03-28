<template>
  <div class="space-y-4">
    <div class="flex flex-col justify-start">
      <span class="w-min min-w-max">Введите запись на стену</span>
      <textarea v-model="message" class="rounded h-40" />
    </div>
    <div class="flex space-x-4 items-end">
      <div class="flex flex-col">
        <span class="">Дата поста</span>
        <input v-model="date" type="date" class="rounded">
      </div>
      <div class="flex flex-col">
        <span class="">Время поста</span>
        <input v-model="time" type="time" class="rounded">
      </div>
      <Button class="h-10 block bg-green-300" @click="roundTime">
        Округлить время
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { format, parse, roundToNearestMinutes } from 'date-fns'
import { mapFields } from 'vuex-map-fields'
import { TIME_FMT, TIME_NEAREST_TO } from '~/constants'

export default defineComponent({
  name: 'PostText',

  computed: {
    ...mapFields('post', ['message', 'date', 'time'])
  },

  methods: {
    roundTime () {
      const time = parse(this.time as string, TIME_FMT, new Date())
      this.time = format(roundToNearestMinutes(time, { nearestTo: TIME_NEAREST_TO }), TIME_FMT)
    }
  }
})
</script>
