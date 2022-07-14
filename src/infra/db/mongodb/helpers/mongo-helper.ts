import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  url: null as unknown as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect () {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map: <T>(data: any): T => {
    const { _id, ...rest } = data
    return Object.assign({}, rest, { id: _id.toHexString() })
  },

  mapCollection: <T>(collection: any[]): T[] => {
    return collection.map<T>(MongoHelper.map)
  }
}
