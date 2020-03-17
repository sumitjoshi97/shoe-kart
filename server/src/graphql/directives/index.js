import isAuth from './isAuth'

const directives = {
  typeDefs: [isAuth.typeDef],
  schemaDirectives: { isAuth: isAuth.directive }
}

export default directives