import { getAccessToken, parseJson } from './services';

export default async (req, res) => {
  const user = await parseJson(req);
  console.log(user);
  const isAuthenticated = !!user?.userId && !!getAccessToken(user.userId);
  res.end(JSON.stringify({isAuthenticated}));
}
