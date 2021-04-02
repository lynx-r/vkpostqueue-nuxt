import { saveMessage } from './vk-service'

it('should save message', () => {
  const ctx = {
    $storage: {
      getCookie () {
        return process.env.TEST_ACCESS_TOKEN
      }
    },
    $config: {
      groupId: process.env.TEST_GROUP_ID
    }
  }
  return saveMessage(ctx, 'hi')
  // .then(r => console.log(r))
  // .catch(e => console.log(e))
  // .finally((d) => {
  //   console.log(d)
  //   done()
  // })

  // console.log(r)
  // expect(r).toEqual(0)
})
