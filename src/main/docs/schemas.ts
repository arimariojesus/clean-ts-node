import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  signUpParamsSchema,
  surveyAnswerSchema,
  surveySchema,
  surveysSchema,
  addSurveyParamsSchema,
  saveSurveyParamsSchema,
  surveyResultSchema,
  surveyResultAnswerSchema
} from './schemas/'

export default {
  account: accountSchema,
  'login-params': loginParamsSchema,
  'signup-params': signUpParamsSchema,
  error: errorSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  'survey-answer': surveyAnswerSchema,
  'add-survey-params': addSurveyParamsSchema,
  'save-survey-params': saveSurveyParamsSchema,
  'survey-result': surveyResultSchema,
  'survey-result-answer': surveyResultAnswerSchema
}
