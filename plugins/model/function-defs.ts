import { Context } from '@nuxt/types'

type Doc = {
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

export type IDocSaveResult = {type: 'doc', doc: Doc}

export type SaveDoc = (
  ctx: Context,
  params: { doc: File | string, type: 'msg' | 'img', postOnDate: string, userId: string }
) => Promise<IDocSaveResult>

export type DocsStore = {[key: string]: {docInfo: IDocSaveResult, title?: string, postOnDate?: string}[]}

export type PutToQueue = (
  ctx: Context,
  params: { images: File[], message: string, postOnDate: string, userId: string }
) => Promise<DocsStore>

export type QueuePost = (
  ctx: Context,
  params: { images: File[], message: string, postOnDate: string, userId: string }
) => void
