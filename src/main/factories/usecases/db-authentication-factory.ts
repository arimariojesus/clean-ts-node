import env from '@/main/config/env'
import { AccountMongoRepository } from '@/infra/db'
import { JwtAdapter, BcryptAdapter } from '@/infra/criptography'
import { DbAuthentication } from '@/data/usecases'
import { Authentication } from '@/domain/usecases'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}