<template>
  <div class="space-y-2">
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
        v-model="dateField"
        label="Дата поста"
        name="dateInput"
        rules="required|onlyFutureDateWithTime:@timeInput"
      />
      <TimeInput
        ref="timeInput"
        v-model="timeField"
        label="Время поста"
        name="timeInput"
        rules="required|onlyFutureTimeWithDate:@dateInput"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mapFields } from 'vuex-map-fields'

export default defineComponent({
  name: 'PostTimer',

  computed: {
    date () {
      return this.dateField as string
    },

    time () {
      return this.timeField as string
    },

    ...mapFields('post', { dateField: 'date', timeField: 'time' })
  },

  methods: {
    onNearest () {
      this.timeField = this.$utils.formatTime(new Date())
      this.dateField = this.$utils.formatDate(new Date())
      this.onRoundTime()
    },

    onRoundTime () {
      if (!this.$utils.isValidDatetime(this.date, this.time)) {
        this.onNearest()
        return
      }
      this.timeField = this.$utils.getRoundedTime(this.time)
    },

    onAddHours (hours: number) {
      if (!this.$utils.isValidTime(this.time)) {
        this.onNearest()
        return
      }
      this.timeField = this.$utils.addHoursAndReformat(this.time, hours)
    },

    onSubHours (hours: number) {
      if (!this.$utils.isValidTime(this.time)) {
        this.onNearest()
        return
      }
      this.timeField = this.$utils.subHoursAndReformat(this.time, hours)
    }
  }
})
</script>
