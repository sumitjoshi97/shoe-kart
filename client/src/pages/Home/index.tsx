import React from 'react'
import Header from 'src/components/Header'
import Hero from './Hero'
import './styles.scss'

const Home: React.FC = () => (
  <div className="home">
    <Header />
    <Hero />
  </div>
)

export default Home
