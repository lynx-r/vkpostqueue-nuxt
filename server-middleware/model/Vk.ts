/* eslint-disable camelcase */

export interface VkToken {
  userId: string
  accessToken: string
  expiresIn: number
}

export type UploadServerResponse = { server: number, photos_list: string, hash: string }
