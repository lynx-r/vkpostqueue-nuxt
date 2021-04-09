import { Context } from '@nuxt/types'

export type DocInfo = {
  id: number,
  // eslint-disable-next-line camelcase
  owner_id: number,
  title: string,
  size: number,
  ext: string,
  url: string
  date: number,
  type: 1 | 2 | 3| 4| 5| 6| 7| 8,
  preview: any
}

export type DocType = 'msg' | 'img'

export type Image = {id: string, doc: DocInfo}
export type Text = {id: string, doc: DocInfo, slug: string}

export type Message = {
  text: Text,
  images: Image[]
}

export type StoredDocs = {[key: string]: Message[]}
export type PostMessages = {postOnDate: string, slug: string, id: string}[]

export type SavePostParams = { images: File[], text: string, postOnDate: string, userId: string }
export type SaveDocParams = { doc: File | string, postOnDate: string, userId: string, type: DocType }
