export const S3_BUCKET = process.env.S3_BUCKET
export const NEW_BUCKET_PREFIX = process.env.S3_OBJECT_PREFIX_NEW
export const VK_GROUP_OWNER_ID = process.env.VK_GROUP_OWNER_ID
export const VK_GET_ACCESS_TOKEN_URL = `https://oauth.vk.com/access_token?client_id=${process.env.VK_CLIENT_ID}&client_secret=${process.env.VK_CLIENT_SECRET}&redirect_uri=${process.env.VK_AUTHORIZATION_CALLBACK}`
export const VK_AUTH_ERROR_REDIRECT = process.env.VK_AUTH_ERROR_REDIRECT
export const VK_AUTH_SUCCESS_REDIRECT = process.env.VK_AUTH_SUCCESS_REDIRECT
