import { IncomingMessage, ServerResponse } from 'http'
import { parseJson, VK_AUTH_ERROR_REDIRECT, VK_AUTH_SUCCESS_REDIRECT, VK_GET_ACCESS_TOKEN_URL } from './services'
import fetch  from 'node-fetch'

export default async (req: IncomingMessage, res: ServerResponse) => {
  const codeMatch = req.url?.match(/code=(\w+)/)
  if (!codeMatch?.length) {
    res.end({message: 'Unable to get "authorization code"'})
    return
  }
  const code = codeMatch[1]
  console.log('code', code)
  const getAccessToken = VK_GET_ACCESS_TOKEN_URL + `&code=${code}`
  const tokenRes = await fetch(getAccessToken)
  const token: any = await parseJson(tokenRes.body)
  if (!!token?.error) {
    console.log(token)
    res.writeHead(302, {Location: VK_AUTH_ERROR_REDIRECT})
    res.end()
    return
  }
  console.log(token)
  res.writeHead(302, {Location: VK_AUTH_SUCCESS_REDIRECT})
  res.end()
}
