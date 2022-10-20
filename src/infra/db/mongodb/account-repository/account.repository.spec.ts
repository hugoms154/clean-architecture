import { AccountMongoRepository } from './account.repository'

import { mongoHelper } from '../helpers/mongo.helper'

interface SutTypes {
  sut: AccountMongoRepository
}

const makeSut = (): SutTypes => {
  return {
    sut: new AccountMongoRepository()
  }
}

describe('account mongo repository', () => {
  beforeEach(async () => {
    jest.restoreAllMocks()
    await mongoHelper.getCollection('accounts').deleteMany({})
  })

  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  test('should return an account on success', async () => {
    const { sut } = makeSut()

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
