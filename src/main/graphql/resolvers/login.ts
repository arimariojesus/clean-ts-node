import { adaptResolver } from '@/main/adapters'
import { makeLoginController } from '@/main/factories/controllers/login/login/login-controller-factory'

export default {
  Query: {
    async login (parent: any, args: any) {
      return adaptResolver(makeLoginController(), args)
    }
  }
}
