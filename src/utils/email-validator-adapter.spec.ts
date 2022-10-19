import { EmailValidatorAdapter } from './email-validator-adapter.'
import validator from 'validator'

interface SutTypes {
  sut: EmailValidatorAdapter
}

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): SutTypes => {
  const sut = new EmailValidatorAdapter()
  return { sut }
}

describe('EmailValidator Adapter', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('should return false if validator returns false', () => {
    const { sut } = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const isValid = sut.isValid('invalid@email.com')

    expect(isValid).toBe(false)
  })

  test('should return true if validator returns true', () => {
    const { sut } = makeSut()

    const isValid = sut.isValid('valid@email.com')

    expect(isValid).toBe(true)
  })

  test('should call validator with correct email', () => {
    const { sut } = makeSut()
    const isValidSpy = jest.spyOn(validator, 'isEmail')

    sut.isValid('valid@email.com')

    expect(isValidSpy).toHaveBeenCalledWith('valid@email.com')
  })
})
