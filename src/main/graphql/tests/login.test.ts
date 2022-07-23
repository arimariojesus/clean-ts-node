import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { Express } from 'express'
import request from 'supertest'

import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { setupApp } from '@/main/config/app'

let app: Express
let accountCollection: Collection

describe('Login GraphQL', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const name = 'John Doe'
  const email = 'john.doe@mail.com'
  const password = '123'
  const query = `query {
    login (email: "${email}", password: "${password}") {
      accessToken
      name
    }
  }`

  test('Should return an Account on valid credentials', async () => {
    const hashedPassword = await hash(password, 12)
    await accountCollection.insertOne({
      name,
      email,
      password: hashedPassword
    })
    const res = await request(app)
      .post('/graphql')
      .send({ query })
    expect(res.status).toBe(200)
    expect(res.body.data.login.accessToken).toBeTruthy()
    expect(res.body.data.login.name).toBe(name)
  })

  test('Should return UnauthorizedError on invalid credentials', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({ query })
    expect(res.status).toBe(401)
    expect(res.body.data).toBeFalsy()
    expect(res.body.errors[0].message).toBe('Unauthorized')
  })
})
