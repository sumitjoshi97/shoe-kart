import { gql, makeExecutableSchema } from 'apollo-server-express'
import deepmerge from 'deepmerge'

import directives from '../graphql/directives'
import enums from '../graphql/enums'

const globalTypeDefs = gql`
  type Query
  type Mutation
`

const makeExecutableSchemaFromModules = ({ modules }) => {
  let typeDefs = [
    globalTypeDefs,
    ...enums.typeDefs,
    ...directives.typeDefs
  ]

  let resolvers = {}

  modules.forEach(module => {
    typeDefs = [
      ...typeDefs,
      ...module.typeDefs
    ]

    resolvers = deepmerge(resolvers, module.resolvers)
  });

  return makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: { ...directives.schemaDirectives }
  })

}

export default makeExecutableSchemaFromModules