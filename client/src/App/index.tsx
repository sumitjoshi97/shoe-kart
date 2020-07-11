import React, { Suspense, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import Auth from '../components/Auth'
import Header from '../components/Header'
import { useGlobalState, useGlobalDispatch } from '~store'
import routes from './routes'
import isEmpty from '~helpers/isEmpty'
import { ADD_TO_CART } from '../components/Cart/queries'
import { getLocalCart } from '~helpers/localCart'
import { useMutation } from '@apollo/react-hooks'

const App: React.FC = () => {
  const { state } = useGlobalState()
  const { dispatch } = useGlobalDispatch()

  useEffect(() => {
    const credentials = localStorage.getItem('credentials')
    if (credentials) {
      const userId = JSON.parse(credentials).user_id
      dispatch({ type: 'ADD_USER', user: userId })
    }
  }, [])

  useEffect(() => {
    const cart = getLocalCart()
    if (cart && isEmpty(state.userId)) {
      const parsedCart = JSON.parse(cart)
      if (!isEmpty(parsedCart)) {
        dispatch({ type: 'INIT_CART', cart: parsedCart })
        dispatch({ type: 'UPDATE_CART_INFO', cart: parsedCart })
      }
    }
  }, [])

  const [addToCart] = useMutation(ADD_TO_CART)

  if (!isEmpty(state.userId) && !isEmpty(state.cart)) {
    Object.values(state.cart).forEach((cartItem: any) =>
      addToCart({
        variables: {
          productId: cartItem.product._id,
          quantity: cartItem.quantity,
          selectedSize: cartItem.selectedSize,
        },
      }),
    )
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <>
      <Header />
      <div className="app-container">
        {state.showAuthDialog && state.userId === '' && <Auth />}
        <Switch>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              render={props => (
                <Suspense fallback={<div />}>
                  <route.component {...props} />
                </Suspense>
              )}
            />
          ))}
        </Switch>
      </div>
    </>
  )
}

export default App
