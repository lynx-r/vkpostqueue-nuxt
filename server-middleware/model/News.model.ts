export type NewsType = 'message' | 'attachment'
export type AttachmentType = 'message' | 'image' | 'video'

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
