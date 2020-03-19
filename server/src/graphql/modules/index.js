import Auth from './Auth'
import Product from './Product'

import makeExecutableSchemaFromModules from '../../utils/modules'

const schema = makeExecutableSchemaFromModules({
  modules: [Auth, Product]
})

export default schema