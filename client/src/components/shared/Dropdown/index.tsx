import React, { useEffect, useState, useRef } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import './styles.scss'
const Dropdown = (props: any) => {
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

  const handleDropdownOption = (type: string, option: number) => {
    props.handleDropdown(type, option)
    setShowDropdown(false)
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div
        className="dropdown__header"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span>{props.value}</span>
        <FiChevronDown fontSize="1.6rem" />
      </div>

      {showDropdown && (
        <ul className="dropdown__list">
          {props.options.map((option: any) => (
            <li
              className="dropdown__list__option"
              key={option}
              onClick={() => handleDropdownOption(props.type, option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
