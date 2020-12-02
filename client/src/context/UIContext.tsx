import React, { createContext, useState } from 'react'

export interface IUIContext {
  activeMainCategory: string
  activeFilterCategories: string[]
  activePaymentMethod: string
  showDialog: boolean
  showLeftNav: boolean
  sortBy: string | undefined
  handleActiveMainCategory: (category: string) => void
  handleActiveFilterCategories: (category: string) => void
  resetCategories: () => void
  handleActivePaymentMethod: (paymentMethodId: string) => void
  handleSortBy: (sortOption: string) => void
  toggleDialog: () => void
  toggleLeftNav: () => void
}

export const UIContext = createContext({} as IUIContext)

export const UIProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [sortBy, setSortBy] = useState<string>()
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [showLeftNav, setShowLeftNav] = useState<boolean>(true)
  const [activeMainCategory, setActiveMainCategory] = useState<string>('')
  const [activeFilterCategories, setActiveFilterCategories] = useState<
    string[]
  >([])
  const [activePaymentMethod, setActivePaymentMethod] = useState<string>('')

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

  const handleActivePaymentMethod = (paymentMethodId: string) => {
    setActivePaymentMethod(paymentMethodId)
  }

  const handleSortBy = (sortOption: string) => {
    setSortBy(sortOption)
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
        activePaymentMethod,
        showDialog,
        showLeftNav,
        sortBy,
        handleActiveMainCategory,
        handleActiveFilterCategories,
        resetCategories,
        handleActivePaymentMethod,
        handleSortBy,
        toggleDialog,
        toggleLeftNav,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}
