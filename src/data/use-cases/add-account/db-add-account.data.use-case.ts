import { AccountModel } from '../../../domain/models/account.model'
import { AddAccount, AddAccountModel } from '../../../domain/use-cases/add-account.use-case'
import { AddAccountRepository } from '../../protocols'
import { Encrypter } from '../../protocols/encrypter.protocol'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)

    await this.addAccountRepository.add({ ...accountData, password: hashedPassword })

    return await new Promise(resolve => resolve(null as any))
  }
}
