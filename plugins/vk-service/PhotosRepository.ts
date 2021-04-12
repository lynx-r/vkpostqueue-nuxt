import { Repository, TSendRequest } from 'vkontakte-api'
import { DocInfo, PhotoInfo } from '~/plugins/model'

export interface IGetWallUploadServerParams {
  groupId: number
}

export interface IGetWallUploadServerResult {
  uploadUrl: string
  albumId: number
  userId: number
}

export interface ISaveWallPhotoParams {
  groupId: number
  userId: number
  photo: string
  server: string
  hash: string
  latitude?: number
  longitude?: number
  caption?: string
}

export interface ISaveWallPhotoResult extends PhotoInfo {
}

export class PhotosRepository extends Repository {
  constructor (sendRequest: TSendRequest) {
    super('photos', sendRequest)
  }

  /**
   * @see https://vk.com/dev/wall.post
   */
  getWallUploadServer = this.r<IGetWallUploadServerParams, IGetWallUploadServerResult>('getWallUploadServer')

  saveWallPhoto = this.r<ISaveWallPhotoParams, ISaveWallPhotoResult[]>('saveWallPhoto')
}
