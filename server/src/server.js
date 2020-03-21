import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import getUser from './utils/context'
import schema from './graphql/modules'

const app = express()

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    user: await getUser(req),
  }),
})

apolloServer.applyMiddleware({ app, path: '/graphql' })

app.get('/', (req, res) => res.status(404).json({ message: 'success' }))

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`server running at ${PORT}`))
