import { AccountModel } from '../../../domain/models/account.model'
import { AddAccountModel } from '../../../domain/use-cases/add-account.use-case'
import { AddAccountRepository } from '../../protocols'
import { Encrypter } from '../../protocols/encrypter.protocol'
import { DbAddAccount } from './db-add-account.data.use-case'

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid name',
        email: 'valid@email.com',
        password: 'hashed_password'
      }
      return await new Promise(resolve => resolve(fakeAccount))
    }
  }

  return new AddAccountRepositoryStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  return { sut, encrypterStub, addAccountRepositoryStub }
}

describe('DbAddAccount use case', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid name',
      email: 'valid@email.com',
      password: 'valid_password'
    }

    await sut.add(accountData)

    expect(encrypterSpy).toHaveBeenCalledWith('valid_password')
  })

  test('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(Promise.reject(new Error()))
    const accountData = {
      name: 'valid name',
      email: 'valid@email.com',
      password: 'valid_password'
    }

    const promise = sut.add(accountData)

    void expect(promise).rejects.toThrow()
  })

  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      name: 'valid name',
      email: 'valid@email.com',
      password: 'valid_password'
    }

    await sut.add(accountData)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid name',
      email: 'valid@email.com',
      password: 'hashed_password'
    })
  })

  test('should throw if Encrypter throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const accountData = {
      name: 'valid name',
      email: 'valid@email.com',
      password: 'valid_password'
    }

    const promise = sut.add(accountData)

    void expect(promise).rejects.toThrow()
  })

  test('should return an account on success', async () => {
    const { sut } = makeSut()
    const accountData = {
      name: 'valid name',
      email: 'valid@email.com',
      password: 'valid_password'
    }

    const account = await sut.add(accountData)

    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid name',
      email: 'valid@email.com',
      password: 'hashed_password'
    })
  })
})
