import { Button } from './Button.tsx'
import { ReactNode, useRef, useState } from 'react'

export interface DropdownOption {
  id: string
  label: string
  icon?: ReactNode
}

interface Props {
  selected: DropdownOption | undefined
  options: DropdownOption[]
  onChange: (option: DropdownOption) => void
}

export function Dropdown({ selected, options, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const [optionsVisible, setOptionsVisible] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const toggleOpen = () => {
    clearTimeout(timeoutRef.current)
    if (!optionsVisible) {
      setOpen(true)
      setTimeout(() => setOptionsVisible(true), 0)
    } else {
      setOptionsVisible(false)
      timeoutRef.current = setTimeout(() => setOpen(false), 200)
    }
  }

  const handleChange = (option: DropdownOption) => {
    if (option.id !== selected?.id) onChange(option)
    toggleOpen()
  }

  return (
    <div className="relative">
      <Button
        twoDimensional
        className={`flex gap-2 py-2 px-2 w-full dropdown-main ${
          optionsVisible ? 'options-visible' : ''
        }`}
        style={{
          ...(open
            ? {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }
            : {}),
        }}
        onClick={toggleOpen}
      >
        {selected?.icon}
        <div>{selected?.label}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 ml-auto"
        >
          {optionsVisible ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          )}
        </svg>
      </Button>

      <div
        className={`absolute w-full z-50 divide-y divide-gray-100 rounded-b-lg rounded-tr-lg bg-[#00000085] 
                    ${open ? '' : 'hidden'}`}
      >
        <div className="flex flex-col text-sm text-gray-200">
          {options.map((option) => (
            <Button
              key={option.id}
              className={`flex gap-2 py-2 px-2 dropdown-option ${
                optionsVisible ? 'options-visible' : ''
              }`}
              onClick={() => handleChange(option)}
            >
              {option.icon}
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}