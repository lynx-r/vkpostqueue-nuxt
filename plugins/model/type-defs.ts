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

export type Doc = {type: 'img' | 'msg', docInfo: DocInfo, msgSlug?: string}
export type Message = Omit<Doc, 'msgSlug'> & {msgSlug: string}

export type SaveDoc = (
  ctx: Context,
  params: { doc: File | string, type: 'msg' | 'img', postOnDate: string, userId: string }
) => Promise<Doc>

export type StoredDocs = {[type: string]: Doc[]}
export type PostMessages = {postOnDate: string, slug: string, docId: number}[]

export type PutToQueue = (
  ctx: Context,
  params: { images: File[], message: string, postOnDate: string, userId: string }
) => Promise<Doc[]>

export type QueuePost = (
  ctx: Context,
  params: { images: File[], message: string, postOnDate: string, userId: string }
) => void
