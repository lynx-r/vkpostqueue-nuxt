import _ from 'lodash'
import { parseISO } from 'date-fns'
import { DATETIME_FMT_SPLIT } from '../config-constants'
import { PostMessages, StoredDocs } from '~/plugins/model'

export const dateTimeFormatter = (date: string, time: string) => date + DATETIME_FMT_SPLIT + time

export const storedDocsToPostMessages = (docs: StoredDocs): PostMessages =>
  _.entries(docs)
    .flatMap(([postOnDate, docs]) =>
      docs.filter(doc => doc.type === 'msg')
        .map(doc => ({ postOnDate, slug: doc.msgSlug!, docId: doc.docInfo.id }))
    )

export const sortStoredDocs = (docs: StoredDocs): StoredDocs =>
  Object.fromEntries(Object.entries(docs)
    .sort(([k1], [k2]) =>
      parseISO(k1).getTime() - parseISO(k2).getTime())
  )
