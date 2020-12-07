import React, { useEffect, useState, useRef } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { ICategory, IDropdownOption } from '~interface'
import './styles.scss'

export interface IDropdownProps {
  current: string | number
  type: string
  value: number
  options: ICategory[] | IDropdownOption[]
  handleDropdown: (
    updateType: string,
    updateValue: IDropdownOption | ICategory,
  ) => void
}

const Dropdown: React.FC<IDropdownProps> = props => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  const handleClickOutside = (event: Event) => {
    const target = event.target
    if (
      !(
        dropdownRef &&
        dropdownRef.current &&
        target instanceof Node &&
        !dropdownRef.current.contains(target)
      )
    )
      return

    setShowDropdown(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  const handleDropdownOption = (
    type: string,
    option: ICategory | IDropdownOption,
  ) => {
    props.handleDropdown(type, option)
    setShowDropdown(false)
  }

  const currentValue = props.options.find(
    (option: ICategory | IDropdownOption) => option._id === props.current,
  )

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div
        className="dropdown__header"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span>{currentValue && currentValue.name}</span>
        <FiChevronDown fontSize="1.6rem" />
      </div>

      {showDropdown && (
        <ul className="dropdown__list">
          {props.options &&
            props.options.map((option: ICategory | IDropdownOption) => (
              <li
                className="dropdown__list__option"
                key={option._id}
                onClick={() => handleDropdownOption(props.type, option)}
              >
                {option.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
