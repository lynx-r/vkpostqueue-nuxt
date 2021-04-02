import { Context } from '@nuxt/types'

export type SaveMessage = (ctx: Context, params: { message: string, postOnDate: string, userId: string }) => void
export type QueuePost = (ctx: Context, params: { message: string, postOnDate: string, userId: string, images: File[] }) => void
