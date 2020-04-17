import React from 'react'
import { IconCaretRight } from 'vtex.styleguide'

export const Menu: React.FC = ({ children }) => {
  return <ul className="list pa0 ma0">{children}</ul>
}

interface ItemProps {
  title?: React.ReactNode
  onClick?: () => void
}

export const MenuItem: React.FC<ItemProps> = ({ title, onClick }) => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLLIElement> = evt => {
    if (evt.key !== 'Enter' && evt.key !== ' ') {
      return
    }

    onClick?.()
  }

  return (
    <li
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="menu-item flex items-center bb b--light-gray pv6 ph5 pointer hover-bg-action-secondary hover-c-on-action-secondary"
      tabIndex={0}
      role="menuitem"
    >
      <div className="flex-auto">
        <div className="f4">{title}</div>
      </div>
      <div className="flex-none">
        <IconCaretRight />
      </div>
    </li>
  )
}
