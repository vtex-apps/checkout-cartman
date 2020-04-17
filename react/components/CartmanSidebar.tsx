import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ButtonPlain, IconClose, IconCaretLeft } from 'vtex.styleguide'

import Actions from './Actions'
import { useCartman } from './CartmanContext'

const Header: React.FC = () => {
  const { title, setOpen, backAction } = useCartman()

  return (
    <header className="f3 bg-muted-5 c-on-base pa5 tc br3-m br--top-m fw5 flex items-center justify-between">
      <div className="flex-auto flex">
        {backAction && (
          <button
            className="bn bg-transparent pointer pa0 outline-0"
            onClick={backAction}
          >
            <IconCaretLeft />
          </button>
        )}
      </div>
      <span className="flex-auto">
        {title ?? <FormattedMessage id="store/cartman.title" />}
      </span>
      <div className="flex-auto flex justify-end">
        <button
          className="bn bg-transparent pointer pa0 dn-m flex items-center"
          onClick={() => setOpen(false)}
        >
          <IconClose size={24} />
        </button>
      </div>
    </header>
  )
}

const CartmanSidebar: React.FC = () => {
  const handleDeactivate = () => {}

  return (
    <aside className="w-100 vh-100 h-auto-m nr5 mr0-m nb5 mb6-m mw6-m pl8-m">
      <div className="h-100 br0 br3-m bg-white shadow-1-m">
        <div className="flex flex-column">
          <div className="flex-none">
            <Header />
          </div>

          <Actions />

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
