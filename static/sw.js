self.addEventListener('load', () => {
  self.console.log(window, self.window)
  self.console.log(window)
})

self.addEventListener('push', (event) => {
  event.waitUntil(async function () {
    const allClients = await clients.matchAll()
    if (!allClients) {
      return
    }
    const client = allClients[0]
    if (!client) {
      return
    }

    client.postMessage({ action: 'processQueue' })
  }())
})
