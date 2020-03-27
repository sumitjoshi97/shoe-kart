import { gql } from 'apollo-server-express'

export const typeDef = gql`
  enum PaymentStatus {
    PENDING
    DONE
  }
`
