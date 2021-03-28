import { MESSAGE_TYPE, PHOTO_TYPE } from '../services'

export type AttachmentType = typeof MESSAGE_TYPE | typeof PHOTO_TYPE

export interface KeyBuilder {
  userId: string
  name: string
  postOnDate: string
}

export interface Message extends KeyBuilder {
  type: 'message'
  message: string
}

export interface Attachment extends KeyBuilder {
  type: 'attachment'
  attachmentType: AttachmentType
  file: any
}

export type News = Message | Attachment
