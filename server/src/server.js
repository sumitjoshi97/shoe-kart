import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'
import getUser from './utils/context'
import schema from './graphql/modules'

const app = express()

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
    preflightContinue: true,
    exposedHeaders: [
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept',
      'X-Password-Expired',
    ],
    optionsSuccessStatus: 200,
  })
)

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    user: await getUser(req),
  }),
})

apolloServer.applyMiddleware({ app, path: '/graphql' })

app.get('/', (_, res) => res.status(404).json({ message: 'success' }))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`server running at ${PORT}`))
