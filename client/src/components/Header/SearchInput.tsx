import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { ISearchInputProps } from './interface'

const SearchInput: React.FC<ISearchInputProps> = props => {
  const { searchText, handleSearch, handleSearchInput } = props
  return (
    <div className="search-input">
      <input
        type="text"
        className="search-input__input"
        value={searchText}
        onChange={handleSearchInput}
      />
      <button className="search-input__btn" onClick={handleSearch}>
        <FiSearch />
      </button>
    </div>
  )
}

export default SearchInput
