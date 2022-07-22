import { ApolloServer } from 'apollo-server-express'

import typeDefs from '@/main/graphql/type-defs'
import resolvers from '@/main/graphql/resolvers'
import { GraphQLError } from 'graphql'

const checkError = (error: GraphQLError, errorName: string): boolean =>
  [error.name, error.originalError.name].includes(errorName)

const handleErrors = (response: any, errors: readonly GraphQLError[]): void => {
  errors?.forEach(error => {
    response.data = undefined

    if (checkError(error, 'UserInputError')) {
      response.http.status = 400
    } else if (checkError(error, 'AuthenticationError')) {
      response.http.status = 401
    } else if (checkError(error, 'ForbiddenError')) {
      response.http.status = 403
    } else {
      response.http.status = 500
    }
  })
}

export const setupApolloServer = (): ApolloServer => new ApolloServer({
  resolvers,
  typeDefs,
  plugins: [{
    requestDidStart: async () => {
      return {
        willSendResponse: async ({ response, errors }) => handleErrors(response, errors)
      }
    }
  }]
})
