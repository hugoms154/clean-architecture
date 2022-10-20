import { AddAccountRepository } from '../../../../data/protocols'
import { AccountModel } from '../../../../domain/models/account.model'
import { AddAccountModel } from '../../../../domain/use-cases/add-account.use-case'
import { mongoHelper } from '../helpers/mongo.helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountWithoutId = { ...accountData }

    const { insertedId } = await mongoHelper.getCollection('accounts').insertOne(accountData)

    return mongoHelper.map(accountWithoutId, insertedId)
  }
}
