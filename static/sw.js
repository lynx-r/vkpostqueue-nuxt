self.addEventListener('load', () => {
  self.console.log(window, self.window)
  self.console.log(window)
})

self.addEventListener('push', async (event) => {
  const allClients = await clients.matchAll()
  self.console.log(allClients)
  if (!allClients) {
    return
  }
  const client = allClients[0]
  if (!client) {
    return
  }

  const data = event.data.json()
  self.console.log(data)

  // Send a message to the client.
  client.postMessage({
    action: 'getAccessToken'
  })
})

self.addEventListener('message', (event) => {
  event.waitUntil(async function () {
    const { accessToken } = event.data
    // const vkUrl = `https://api.vk.com/method/users.get?user_ids=210700286&access_token=${accessToken}&v=5.130`
    // self.console.log(vkUrl)
    // const r = self.fetch({ url: vkUrl, method: 'GET' })
    // const rr = await r
    self.console.log(rr)
  }())
})
