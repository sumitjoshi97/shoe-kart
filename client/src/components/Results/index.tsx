import React, { useEffect } from 'react'
import LeftNav from './LeftNav'
import Products from './Products'
import ResultsHeader from './ResultsHeader'
import './styles.scss'
import * as queries from './queries'
import { useQuery } from 'react-apollo'
import useResults from './hooks/useResults'

const Results: React.FC = () => {
  const { data } = useQuery(queries.getAllProducts)
  const {
    resultsStore,
    setResultsStore,
    setActiveCategory,
    setActiveFilters,
    resetResultsStore,
    setSortBy,
    toggleLeftNav,
  } = useResults()

  //intialize results-store with graphql data
  useEffect(() => {
    if (data) {
      setResultsStore(data.products)
    }
  }, [data])

  return (
    <div className="results-container">
      <div className="results-header-offset" />
      <ResultsHeader
        category={resultsStore.activeCategory}
        showLeftNav={resultsStore.showLeftNav}
        sortOptions={resultsStore.sortOptions}
        sortBy={resultsStore.sortBy}
        setSortBy={setSortBy}
        toggleLeftNav={toggleLeftNav}
      />
      <div className="results-header-offset" />
      <div className="results">
        {resultsStore.showLeftNav && (
          <LeftNav
            resultsStore={resultsStore}
            setActiveCategory={setActiveCategory}
            setActiveFilters={setActiveFilters}
            resetResultsStore={resetResultsStore}
          />
        )}
        <Products results={data} resultsStore={resultsStore} />
      </div>
    </div>
  )
}

export default Results
