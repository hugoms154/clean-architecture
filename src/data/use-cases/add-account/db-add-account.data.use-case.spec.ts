import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account.data.use-case'

describe('DbAddAccount use case', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('should call Encrypter with correct password', async () => {
    class EncrypterStub implements Encrypter {
      async encrypt (value: string): Promise<string> {
        return await new Promise(resolve => resolve('hashed_password'))
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid name',
      email: 'valid@email.com',
      password: 'valid_password'
    }

    await sut.add(accountData)

    expect(encrypterSpy).toHaveBeenCalledWith('valid_password')
  })
})
