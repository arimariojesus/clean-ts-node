import { ApolloServer } from 'apollo-server-express'

import typeDefs from '@/main/graphql/type-defs'
import resolvers from '@/main/graphql/resolvers'

export const setupApolloServer = (): ApolloServer => new ApolloServer({
  resolvers,
  typeDefs
})
