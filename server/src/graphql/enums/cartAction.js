import { gql } from 'apollo-server-express'

export const typeDef = gql`
  enum CartAction {
    ADD
    DELETE
    QUANTITY
  }
`