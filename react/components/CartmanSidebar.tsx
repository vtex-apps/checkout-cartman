import React from 'react'
import { IconClose } from 'vtex.styleguide'

const Header: React.FC = () => {
  return (
    <header className="f3 bg-muted-4 c-on-base pa5 tc br3-m br--top-m fw5 flex justify-between">
      <span>Cartman</span>
      <button className="bn bg-transparent pointer pa5 dn-m">
        <IconClose size={24} />
      </button>
    </header>
  )
}

const CartmanSidebar: React.FC = () => {
  return (
    <aside className="w-100 mw6-m mb0 mb6-m">
      <div className="h-100 br0 br3-m bg-white shadow-1-m">
        <div className="flex flex-column">
          <div className="flex-none">
            <Header />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default CartmanSidebar
