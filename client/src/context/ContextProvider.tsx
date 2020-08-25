import React from 'react'

import { AuthProvider } from './AuthContext'
import { CartProvider } from './CartContext'
import { UIProvider } from './UIContext'

export const ContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <UIProvider>{children}</UIProvider>
      </CartProvider>
    </AuthProvider>
  )
}
