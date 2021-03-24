import { getAccessToken } from './services';

export default (req, res) => {
  const isAuthenticated = !!getAccessToken()
  res.end(JSON.stringify({isAuthenticated}))
}
