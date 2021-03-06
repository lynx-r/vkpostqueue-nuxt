type DocInfoType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type DocInfo = {
  id: number
  ownerId: number
  title: string
  size: number
  ext: string
  url: string
  date: number
  type: DocInfoType
  preview: any
}

export type PhotoInfo = {
  id: number,
  albumId: number
  ownerId: number
  userId: number
  text: string
  date: number
  sizes: any[]
  width: number
  height: number
}

export type DocType = 'msg' | 'img'

export type Image = {id: number, doc: DocInfo}
export type Text = {id: number, doc: DocInfo, slug: string}

export type Message = {
  text: Text,
  images: Image[]
}

export type StoredDocs = {[key: string]: Message[]}
export type PostMessages = {postOnDate: string, slug: string, id: number}[]

export type SavePostParams = { images: File[], text: string, postOnDate: string, silent?: boolean }
export type RemovePostParams = { messageId: number, silent?: boolean }
export type SaveDocParams = { doc: File | string, postOnDate: string, type: DocType }

export type VkDownloadDocRequest = {url: string, type: DocType}
