import { adaptResolver } from '@/main/adapters'
import { makeLoginController } from '@/main/factories/controllers/login/login/login-controller-factory'
import { makeSignUpController } from '@/main/factories/controllers/login/signup/signup-controller-factory'

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
