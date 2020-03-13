import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'

const app = express()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res })
})

apolloServer.applyMiddleware({ app, path: '/graphql' })

app.get('/', (req, res) => res.status(404).json({ "message": "success" }))

const PORT = 5000 || process.env.PORT

app.listen(PORT, () => console.log(`server running at ${PORT}`))