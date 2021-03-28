<template>
  <div class="">
    <div class="flex space-x-4">
      <DateInput v-model="date" :future-and-now="{linkedTime: time}" name="Дата поста" />
      <TimeInput v-model="time" :future-and-now="{linkedDate: date}" name="Время поста" />
    </div>
    <div class="flex space-x-4">
      <Button class="bg-green-300" @click="onNow">
        Ближайшее
      </Button>
      <Button class="bg-green-300" @click="onRoundTime">
        Округлить
      </Button>
      <Button class="bg-green-300" @click="onAddHours(1)">
        +1 ч.
      </Button>
      <Button class="bg-green-300" @click="onSubHours(1)">
        -1 ч.
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { addHours, addMinutes, format, parse, roundToNearestMinutes, subHours, isPast } from 'date-fns'
import { mapFields } from 'vuex-map-fields'
import { DATE_FMT, TIME_FMT, TIME_NEAREST_TO } from '~/constants'

export default defineComponent({
  name: 'PostTimer',

  data () {
    return {
      time2: ''
    }
  },

  computed: {

    nowDate () {
      return format(new Date(), DATE_FMT)
    },

    timeParsed () {
      return parse(this.time as string, TIME_FMT, new Date())
    },

    dateTimeParsed () {
      return parse(this.date + ' ' + this.time, DATE_FMT + ' ' + TIME_FMT, new Date())
    },

    ...mapFields('post', ['date', 'time'])
  },

  methods: {
    onNow () {
      this.time = format(new Date(), TIME_FMT)
      this.date = format(new Date(), DATE_FMT)
      this.onRoundTime()
    },

    onRoundTime () {
      let time = roundToNearestMinutes(this.timeParsed, { nearestTo: TIME_NEAREST_TO })
      if (isPast(time)) {
        time = roundToNearestMinutes(addMinutes(time, 15), { nearestTo: TIME_NEAREST_TO })
      }
      this.time = format(time, TIME_FMT)
    },

    onAddHours (hours: number) {
      this.time = format(addHours(this.timeParsed, hours), TIME_FMT)
    },

    onSubHours (hours: number) {
      this.time = format(subHours(this.timeParsed, hours), TIME_FMT)
    }
  }
})
</script>

<style scoped>

</style>
