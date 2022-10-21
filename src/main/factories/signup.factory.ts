import { DbAddAccount } from '../../data/use-cases/add-account/db-add-account.data.use-case'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt.adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account.repository'
import { SignUpController } from '../../presentation/controllers/signup.controller'
import { EmailValidatorAdapter } from '../../utils/email-validator.adapter'

export function makeSignUpController (): SignUpController {
  const salt = 12
  const emailValidator = new EmailValidatorAdapter()
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)

  const signupController = new SignUpController(emailValidator, dbAddAccount)
  return signupController
}
