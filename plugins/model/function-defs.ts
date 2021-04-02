import { Context } from '@nuxt/types'

export type SaveDoc = (ctx: Context, params: { doc: File | string, type: 'msg' | 'img', postOnDate: string, userId: string }) => void
export type QueuePost = (ctx: Context, params: { images: File[], message: string, postOnDate: string, userId: string }) => void
