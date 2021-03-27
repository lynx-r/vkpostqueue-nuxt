export const VK_ATTACH_PHOTO_LIMIT = 5
export const NEW_FOLDER_PREFIX = 'new__'
export const POSTED_FOLDER_PREFIX = 'posted__'
export const MESSAGE_TYPE = 'message'
export const MESSAGE_FILENAME = 'text.txt'
export const PHOTO_TYPE = 'photo'
export const NAME_SEP = '__'

export const S3_BUCKET = process.env.S3_BUCKET
export const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID
export const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY
export const S3_REGION = process.env.S3_REGION

export const VK_GROUP_OWNER_ID = process.env.VK_GROUP_OWNER_ID
export const VK_MAIN_ALBUM_ID = process.env.VK_MAIN_ALBUM_ID

export const VK_CLIENT_ID = process.env.VK_CLIENT_ID
export const VK_CLIENT_SECRET = process.env.VK_CLIENT_SECRET
export const VK_AUTHORIZATION_CALLBACK = process.env.VK_AUTHORIZATION_CALLBACK
export const VK_GET_ACCESS_TOKEN_URL = `https://oauth.vk.com/access_token?client_id=${VK_CLIENT_ID}&client_secret=${VK_CLIENT_SECRET}&redirect_uri=${VK_AUTHORIZATION_CALLBACK}`

// для серверной авторизации
export const VK_AUTH_ERROR_REDIRECT = process.env.VK_AUTH_ERROR_REDIRECT
export const VK_AUTH_SUCCESS_REDIRECT = process.env.VK_AUTH_SUCCESS_REDIRECT
