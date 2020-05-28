import { lazy } from 'react'

export default [
  {
    component: lazy(() => import('../components/Results')),
    path: '/results',
  },
  {
    component: lazy(() => import('../components/Product')),
    path: '/product/:productId',
  },
  {
    component: lazy(() => import('../components/Cart')),
    path: '/cart',
  },
  {
    component: lazy(() => import('../components/Home')),
    path: '/',
  },
]
