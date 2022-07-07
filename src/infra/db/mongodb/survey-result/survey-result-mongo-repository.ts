import { SaveSurveyResultParams, SaveSurveyResultRepository, SurveyResultModel } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResult')
    await surveyResultCollection.findOneAndUpdate({
      surveyId: new ObjectId(data.surveyId),
      accountId: new ObjectId(data.accountId)
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true
    })
    const surveyResult = await this.loadBySurveyId(data.surveyId)
    return surveyResult
  }

  private async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResult')
    const query = surveyResultCollection.aggregate<SurveyResultModel>([{
      $match: {
        surveyId: new ObjectId(surveyId)
      }
    }, {
      $group: {
        _id: 0,
        data: {
          $push: '$$ROOT'
        },
        total: {
          $sum: 1
        }
      }
    }, {
      $unwind: {
        path: '$data'
      }
    }, {
      $lookup: {
        from: 'surveys',
        foreignField: '_id',
        localField: 'data.surveyId',
        as: 'survey'
      }
    }, {
      $unwind: {
        path: '$survey'
      }
    }, {
      $group: {
        _id: {
          surveyId: '$survey._id',
          question: '$survey.question',
          date: '$survey.date',
          total: '$total',
          answer: {
            $filter: {
              input: '$survey.answers',
              as: 'item',
              cond: {
                $eq: ['$$item.answer', '$data.answer']
              }
            }
          }
        },
        count: {
          $sum: 1
        }
      }
    }, {
      $unwind: {
        path: '$_id.answer'
      }
    }, {
      $addFields: {
        '_id.answer.count': '$count',
        '_id.answer.percent': {
          $multiply: [{
            $divide: ['$count', '$_id.total']
          }, 100]
        }
      }
    }, {
      $group: {
        _id: {
          surveyId: '$_id.surveyId',
          question: '$_id.question',
          date: '$_id.date'
        },
        answers: {
          $push: '$_id.answer'
        }
      }
    }, {
      $project: {
        _id: 0,
        surveyId: {
          $toString: '$_id.surveyId'
        },
        question: '$_id.question',
        date: '$_id.date',
        answers: '$answers'
      }
    }])
    const surveyResult = await query.toArray()
    return surveyResult.length
      ? surveyResult[0]
      : null
  }
}
