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
  return expect(saveMessage(ctx, 'hi')).resolves.toEqual(1)

  // console.log(r)
  // expect(r).toEqual(0)
})
