import React, { createContext, useState } from 'react'
import { ISortOption } from '~interface'

export interface IUIContext {
  activeMainCategory: string
  activeFilterCategories: string[]
  showDialog: boolean
  showLeftNav: boolean
  sortBy: ISortOption
  handleActiveMainCategory: (category: string) => void
  handleActiveFilterCategories: (category: string) => void
  resetCategories: () => void
  setSortBy: React.Dispatch<React.SetStateAction<ISortOption>>
  toggleDialog: () => void
  toggleLeftNav: () => void
}

export const UIContext = createContext({} as IUIContext)

export const UIProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [sortBy, setSortBy] = useState<ISortOption | {}>({})
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [showLeftNav, setShowLeftNav] = useState<boolean>(true)
  const [activeMainCategory, setActiveMainCategory] = useState<string>('')
  const [activeFilterCategories, setActiveFilterCategories] = useState<
    string[]
  >([])

  const handleActiveMainCategory = (category: string) => {
    if (!!activeMainCategory && activeMainCategory === category) {
      return
    }
    setActiveMainCategory(category)
  }

  const handleActiveFilterCategories = (category: string) => {
    if (activeFilterCategories.includes(category)) {
      const filterCategories = activeFilterCategories.filter(
        activeFilter => activeFilter !== category,
      )
      setActiveFilterCategories(filterCategories)
    } else {
      setActiveFilterCategories([...activeFilterCategories, category])
    }
  }

  const resetCategories = () => {
    setActiveMainCategory('')
    setActiveFilterCategories([])
  }

  const toggleDialog = () => {
    setShowDialog(!showDialog)
  }
  const toggleLeftNav = () => {
    setShowLeftNav(!showLeftNav)
  }

  return (
    <UIContext.Provider
      value={{
        activeMainCategory,
        activeFilterCategories,
        showDialog,
        showLeftNav,
        sortBy,
        handleActiveMainCategory,
        handleActiveFilterCategories,
        resetCategories,
        setSortBy,
        toggleDialog,
        toggleLeftNav,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}
