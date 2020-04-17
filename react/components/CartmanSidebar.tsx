import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ButtonPlain, IconClose } from 'vtex.styleguide'

const Header: React.FC = () => {
  return (
    <header className="f3 bg-muted-5 c-on-base pa5 tc br3-m br--top-m fw5 flex justify-between">
      <span className="w-100">
        <FormattedMessage id="store/cartman.title" />
      </span>
      <button className="bn bg-transparent pointer pa5 dn-m">
        <IconClose size={24} />
      </button>
    </header>
  )
}

const CartmanSidebar: React.FC = () => {
  const handleDeactivate = () => {}

  return (
    <aside className="w-100 mw6-m mb0 mb6-m">
      <div className="h-100 br0 br3-m bg-white shadow-1-m">
        <div className="flex flex-column">
          <div className="flex-none">
            <Header />
          </div>

          <div className="flex flex-column items-center mv5 ph4 mv7-m w-100 lh-copy f6">
            <span className="c-muted-1 dib mb3">
              <FormattedMessage id="store/cartman.cartmanDescription" />
            </span>
            <span className="dib c-emphasis mb3">
              <FormattedMessage id="store/cartman.cartmanWarning" />
            </span>
            <ButtonPlain onClick={handleDeactivate}>
              <span className="ttu">
                <FormattedMessage id="store/cartman.deactivate" />
              </span>
            </ButtonPlain>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default CartmanSidebar
