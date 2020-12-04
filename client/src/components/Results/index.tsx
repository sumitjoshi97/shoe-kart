import React from 'react'
import { useRef } from 'react'
import Layout from '~components/Layout'
import useResize from '~hooks/useResize'
import useStores from '~hooks/useStores'
import LeftNav from './LeftNav'

import LeftNavMobile from './LeftNav/LeftNavMobile'
import Products from './Products'
import ResultsHeader from './ResultsHeader'

import './styles.scss'

const BREAKPOINT = 600

const Results = () => {
  const resultsRef = useRef<HTMLDivElement>(null)
  const { length } = useResize(resultsRef)

  const { uiStore } = useStores()
  const { showLeftNav } = uiStore

  const renderLeftNav = () => {
    if (showLeftNav && length <= BREAKPOINT) {
      return <LeftNavMobile />
    }
    if (showLeftNav && length > BREAKPOINT) {
      return <LeftNav />
    }
    return
  }

  return (
    <Layout>
      <ResultsHeader />
      <div className="results-header-offset" />
      <div className="results" ref={resultsRef}>
        {renderLeftNav()}
        <Products />
      </div>
    </Layout>
  )
}

export default Results
