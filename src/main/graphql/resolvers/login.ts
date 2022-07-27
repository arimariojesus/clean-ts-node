import { adaptResolver } from '@/main/adapters'
import { makeLoginController, makeSignUpController } from '@/main/factories'

export default {
  Query: {
    async login (parent: any, args: any) {
      return adaptResolver(makeLoginController(), args)
    }
  },
  Mutation: {
    async signUp (parent: any, args: any) {
      return adaptResolver(makeSignUpController(), args)
    }
  }
}
