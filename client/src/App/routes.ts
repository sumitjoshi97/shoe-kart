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
    component: lazy(() => import('../components/Profile')),
    path: '/user/profile',
  },
  {
    component: lazy(() => import('../components/Cart')),
    path: '/cart',
  },
  {
    component: lazy(() => import('../components/Checkout')),
    path: '/checkout',
  },
  {
    component: lazy(() => import('../components/Orders')),
    path: '/user/orders',
  },
  {
    component: lazy(() => import('../components/Home')),
    path: '/',
  },
]
