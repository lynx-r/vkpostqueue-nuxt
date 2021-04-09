import {
  addHours,
  addMinutes,
  format, formatISO,
  isPast,
  isValid,
  parse,
  parseISO,
  roundToNearestMinutes,
  subHours
} from 'date-fns'
import _ from 'lodash'
import { DATE_FMT, DATETIME_FMT, DATETIME_FMT_SPLIT, TIME_FMT, TIME_NEAREST_TO } from '../config-constants'
import { PostMessages, StoredDocs } from '../model'

// Message store utils

export const storedDocsToPostMessages = (docs: StoredDocs): PostMessages =>
  _.entries(docs)
    .flatMap(([postOnDate, messages]) =>
      messages
        .map(({ text: { slug, id } }) => ({ postOnDate, slug, id }))
    )

export const sortStoredDocs = (docs: StoredDocs): StoredDocs =>
  Object.fromEntries(Object.entries(docs)
    .sort(([k1], [k2]) =>
      parseISO(k1).getTime() - parseISO(k2).getTime())
  )

// Time utils

export function getRoundedTime (timeStr: string): string {
  const timeParsed = parse(timeStr, TIME_FMT, new Date())
  let time = roundToNearestMinutes(timeParsed, { nearestTo: TIME_NEAREST_TO })
  if (isPast(time)) {
    time = roundToNearestMinutes(addMinutes(time, TIME_NEAREST_TO),
      { nearestTo: TIME_NEAREST_TO })
  }
  return format(time, TIME_FMT)
}

export function getRoundedTimeFromDate (timeParsed: Date): string {
  let time = roundToNearestMinutes(timeParsed, { nearestTo: TIME_NEAREST_TO })
  if (isPast(time)) {
    time = roundToNearestMinutes(addMinutes(time, TIME_NEAREST_TO),
      { nearestTo: TIME_NEAREST_TO })
  }
  return format(time, TIME_FMT)
}

export const formatTime = (time: Date): string => format(time, TIME_FMT)
export const formatDate = (time: Date): string => format(time, DATE_FMT)

export const addHoursAndReformat = (time: string, hours: number): string =>
  format(addHours(parse(time, TIME_FMT, new Date()), hours), TIME_FMT)
export const subHoursAndReformat = (time: string, hours: number): string =>
  format(subHours(parse(time, TIME_FMT, new Date()), hours), TIME_FMT)

export const dateTimeFormatter = (date: string, time: string) => date + DATETIME_FMT_SPLIT + time

export const formatDatetimeISO = (dateStr: string, timeStr: string): string => {
  const datetime = dateTimeFormatter(dateStr, timeStr)
  const date = parse(datetime, DATETIME_FMT, new Date())
  return formatISO(date)
}

export const parseDateTime = (date: string, time: string): Date =>
  parse(dateTimeFormatter(date, time), DATETIME_FMT, new Date())

export const isValidDatetime = (date: string, time: string): boolean => isValid(parseDateTime(date, time))
export const isValidTime = (time: string): boolean => isValid(time)
