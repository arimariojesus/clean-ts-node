import { adaptResolver } from '@/main/adapters'
import { makeLoadSurveyResultController } from '@/main/factories/controllers/survey-result/load-survey-result/load-survey-result-controller-factory'
import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory'

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
