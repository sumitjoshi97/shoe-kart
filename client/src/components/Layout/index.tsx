import React from 'react'

import './styles.scss'

interface ILayoutProps {
  medium?: boolean
  small?: boolean
  children: React.ReactNode
}

const Layout: React.FC<ILayoutProps> = ({ medium, small, children }) => {
  const layoutType = medium ? 'medium' : small ? 'small' : 'large'
  return <div className={`layout layout--${layoutType}`}>{children}</div>
}

export default Layout
