import { Collection, MongoClient, ObjectId } from 'mongodb'

export const mongoHelper = {
  client: null as unknown as MongoClient,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  },
  getCollection (name: string): Collection {
    return (this.client as MongoClient).db().collection(name)
  },
  map (collectionData: any, generatedId: ObjectId): any {
    return { ...collectionData, id: generatedId }
  }
}
