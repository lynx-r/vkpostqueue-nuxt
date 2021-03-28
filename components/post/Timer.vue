<template>
  <div class="flex space-x-4 items-end flex-wrap">
    <div class="flex flex-col">
      <span class="">Дата поста</span>
      <input v-model="date" type="date" class="rounded">
    </div>
    <div class="flex flex-col">
      <span class="">Время поста</span>
      <input v-model="time" type="time" class="rounded">
    </div>
    <Button class="bg-green-300" @click="now">
      Сейчас
    </Button>
    <Button class="bg-green-300" @click="roundTime">
      Округлить
    </Button>
    <Button class="bg-green-300" @click="addHours(1)">
      +1 ч.
    </Button>
    <Button class="bg-green-300" @click="subHours(1)">
      -1 ч.
    </Button>
  </div>
</template>

<script lang="ts">
import { mapFields } from 'vuex-map-fields'
import { format, parse, roundToNearestMinutes, addHours, subHours } from 'date-fns'
import { TIME_FMT, TIME_NEAREST_TO } from '~/constants'

export default {
  name: 'PostTimer',

  data () {
    return {
      plusHours: [1]
    }
  },

  computed: {
    timeParsed () {
      return parse(this.time as string, TIME_FMT, new Date())
    },
    ...mapFields('post', ['date', 'time'])
  },

  methods: {
    now () {
      this.time = format(new Date(), TIME_FMT)
    },

    roundTime () {
      this.time = format(roundToNearestMinutes(this.timeParsed, { nearestTo: TIME_NEAREST_TO }), TIME_FMT)
    },

    addHours (hours: number) {
      this.time = format(addHours(this.timeParsed, hours), TIME_FMT)
    },

    subHours (hours: number) {
      this.time = format(subHours(this.timeParsed, hours), TIME_FMT)
    }
  }
}
</script>

<style scoped>

</style>
