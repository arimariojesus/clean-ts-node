import { makeAddSurveyController, makeLoadSurveysController } from '@/main/factories'
import { adaptRoute } from '@/main/adapters'
import { auth, adminAuth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
