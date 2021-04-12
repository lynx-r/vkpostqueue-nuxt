self.addEventListener('push', (event) => {
  event.waitUntil(async function () {
    const allClients = await self.clients.matchAll()
    if (!allClients || !allClients.length) {
      console.log('clients not found')
      return
    }
    const client = allClients[0]
    const data = event.data.text()
    console.log(`send message "${data}" to ${client.id}`)
    client.postMessage(data)
  }())
})
