import { AccountMongoRepository } from './account.repository'

import { mongoHelper } from '../helpers/mongo.helper'

describe('account mongo repository', () => {
  beforeAll(async () => {
    jest.restoreAllMocks()
    await mongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  test('should return an account on success', async () => {
    const sut = new AccountMongoRepository()

    const account = await sut.add({
      name: 'valid name',
      email: 'valid@email.com',
      password: 'valid_password'
    })

    expect(account.id).toBeTruthy()
    expect(account).toEqual(
      expect.objectContaining({
        name: 'valid name',
        email: 'valid@email.com',
        password: 'valid_password'
      })
    )
  })
})
