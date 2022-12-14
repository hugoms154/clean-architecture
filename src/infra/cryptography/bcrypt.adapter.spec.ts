import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt.adapter'

interface SutTypes {
  sut: BcryptAdapter
}

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise((resolve) => resolve('hash'))
  }
}))

const salt = 12

const makeSut = (): SutTypes => {
  const sut = new BcryptAdapter(salt)

  return { sut }
}

describe('bcrypt adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const { sut } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })

  test('should return a hash on success', async () => {
    const { sut } = makeSut()

    const hash = await sut.encrypt('any_value')

    expect(hash).toBe('hash')
  })

  test('should throw if bcrypt throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })

    const promise = sut.encrypt('any_value')

    await expect(promise).rejects.toThrow()
  })
})
