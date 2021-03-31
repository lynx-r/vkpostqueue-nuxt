<template>
  <div class="">
    <div class="flex space-x-4">
      <Button class="bg-green-300" @click="onNearest">
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
    <div class="flex space-x-4">
      <DateInput
        v-model="date"
        label="Дата поста"
        name="dateInput"
        rules="required|onlyFutureDateWithTime:@timeInput"
      />
      <TimeInput
        ref="timeInput"
        v-model="time"
        label="Время поста"
        name="timeInput"
        rules="required|onlyFutureTimeWithDate:@dateInput"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import {
  addHours,
  addMinutes,
  format,
  isPast,
  isValid,
  parse,
  roundToNearestMinutes,
  subHours
} from 'date-fns'
import { mapFields } from 'vuex-map-fields'

export default defineComponent({
  name: 'PostTimer',

  computed: {
    timeParsed () {
      return parse(this.time as string, this.$const.TIME_FMT, new Date())
    },

    dateTimeParsed () {
      return parse(this.date + ' ' + this.time,
        this.$const.DATE_FMT + ' ' + this.$const.TIME_FMT, new Date())
    },

    ...mapFields('post', ['date', 'time'])
  },

  created () {
    this.onNearest()
  },

  methods: {
    onNearest () {
      this.time = format(new Date(), this.$const.TIME_FMT)
      this.date = format(new Date(), this.$const.DATE_FMT)
      this.onRoundTime()
    },

    onRoundTime () {
      if (!isValid(this.dateTimeParsed)) {
        this.onNearest()
        return
      }
      let time = roundToNearestMinutes(this.timeParsed, { nearestTo: this.$const.TIME_NEAREST_TO })
      if (isPast(time)) {
        time = roundToNearestMinutes(addMinutes(time, this.$const.TIME_NEAREST_TO), { nearestTo: this.$const.TIME_NEAREST_TO })
      }
      this.time = format(time, this.$const.TIME_FMT)
    },

    onAddHours (hours: number) {
      if (!isValid(this.timeParsed)) {
        this.onNearest()
        return
      }
      this.time = format(addHours(this.timeParsed, hours), this.$const.TIME_FMT)
    },

    onSubHours (hours: number) {
      if (!isValid(this.timeParsed)) {
        this.onNearest()
        return
      }
      this.time = format(subHours(this.timeParsed, hours), this.$const.TIME_FMT)
    }
  }
})
</script>
