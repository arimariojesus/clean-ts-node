import { adaptResolver } from '@/main/adapters'
import { makeLoadSurveyResultController, makeSaveSurveyResultController } from '@/main/factories'

export default {
  Query: {
    async surveyResult (parent: any, args: any, context: any) {
      return adaptResolver(makeLoadSurveyResultController(), args, context)
    }
  },

  Mutation: {
    async saveSurveyResult (parent: any, args: any, context: any) {
      return adaptResolver(makeSaveSurveyResultController(), args, context)
    }
  }
}
