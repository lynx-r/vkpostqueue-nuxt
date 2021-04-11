self.addEventListener('push', (event) => {
  const data = event.data.json()
  self.console.log(data)

  self.registration.showNotification(data.title, {
    body: 'Yay it works!'
  })
})
