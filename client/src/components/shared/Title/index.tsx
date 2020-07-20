import React from 'react'
import './styles.scss'

interface ITitleProps {
  children: string
}

const Title: React.FC<ITitleProps> = ({ children }) => (
  <h2 className="title">{children}</h2>
)

export default Title
