import { Repository, TSendRequest } from 'vkontakte-api'

// Firstly, describe parameters and result. Dont forget that sent parameters
// will be snake cased, and result - camel cased.
/**
 * @see https://vk.com/dev/auth.restore
 */
export interface IGetUploadServerParams {
  groupId: number
}

export interface IGetUploadServerResult {
  uploadUrl: string
}

export interface ISaveParams {
  file: string
  title: string
  tags?: string
  returnTags?: boolean
}

export interface ISaveResult {
  type: string
}

// Create repository class which should extends abstract Repository.
export class DocsRepository extends Repository {
  constructor (sendRequest: TSendRequest) {
    // Call Repository's constructor and as the first argument, we pass
    // API namespace name.
    // @see https://vk.com/dev/auth
    super('docs', sendRequest)
  }

  /**
   * @see https://vk.com/dev/auth.restore
   * @type {(params: (IRestoreParams & IRequestOptionalParams)) => Promise<IRestoreResult>}
   */
  // Describe all repository methods. As the first we should pass method name.
  // As a second one - function which modifies passed parameters however we
  // want. You could use such functions as "formatOptionalArray" or
  // "formatOptionalBoolean" from 'vkontakte-api'.
  getUploadServer = this.r<IGetUploadServerParams, IGetUploadServerResult>('getUploadServer');

  save = this.r<ISaveParams, ISaveResult>('save');
}
