import { AddAccount } from '../usecases/account/add-account'
import { Authentication } from '../usecases/account/authentication'
import { faker } from '@faker-js/faker'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
