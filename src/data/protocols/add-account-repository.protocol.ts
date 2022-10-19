import { AccountModel } from '../../domain/models/account.model'
import { AddAccountModel } from '../../domain/use-cases/add-account.use-case'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
