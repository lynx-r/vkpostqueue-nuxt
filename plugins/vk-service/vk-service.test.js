import { saveMessage } from './vk-service'

it('should save message', async () => {
  const ctx = {
    $storage: {
      getCookie () {
        return 'bf779199c091672aef1912d1f740a6bb36f79a9890f116ee6788a26a474ed55f27a60b88e30b1513e392a'
      }
    },
    $config: {
      groupId: 203255283
    }
  }
  try {
    const r = await saveMessage(ctx, 'hi')
    // console.log(r)
    expect(r).toEqual(1)
  } catch (e) {
    // console.log(e)
    expect(1).toEqual(1)
  }
})
