import { IPost, Repository, TSendRequest } from 'vkontakte-api'

/**
 * @see https://vk.com/dev/wall.post
 */
export interface TPostParams {
  ownerId: string | number;
  friendOnly?: boolean;
  fromGroup?: boolean;
  message: string
  attachments: string[] | string
}

export type TPostResult = IPost[];
export class WallRepository extends Repository {
  constructor (sendRequest: TSendRequest) {
    super('wall', sendRequest)
  }

  /**
   * @see https://vk.com/dev/wall.post
   */
  post = this.r<TPostParams, TPostResult>('post');
}
