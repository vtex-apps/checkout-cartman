import classnames from 'classnames'
import React, { useState, Fragment, useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button, IconClose, IconCaretLeft } from 'vtex.styleguide'

import Actions from './Actions'
import { Menu, MenuItem } from './Menu'
import { useCartman } from './CartmanContext'
import CartDetails from './CartDetails'
import AddRandomItem from './AddRandomItem'

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

interface Props {
  className?: string
}

const CartmanSidebar: React.FC<Props> = ({ className }) => {
  const handleDeactivate = () => {}

  const [currentStep, setCurrentStep] = useState<string | null>(null)

  const handleBack = useCallback(() => setCurrentStep(null), [])

  return (
    <aside
      className={classnames(
        className,
        'w-100 h-100 h-auto-m mw6-m pl8-m mb0 mb6-m'
      )}
      style={{ minHeight: 0 }}
    >
      <div className="h-100 br0 br3-m bg-white shadow-1-m">
        <div className="h-100 flex flex-column">
          <div className="flex-none">
            <Header />
          </div>
          <div className="overflow-auto">
            {currentStep === null ? (
              <Fragment>
                <Actions />

                <Menu>
                  <MenuItem
                    title={<FormattedMessage id="store/cartman.viewDetails" />}
                    onClick={() => setCurrentStep('cart-details')}
                  />
                  <MenuItem
                    title={<FormattedMessage id="store/cartman.addRandom" />}
                    onClick={() => setCurrentStep('add-random-item')}
                  />
                </Menu>

                <div className="flex flex-column items-center mv5 ph4 mv7-m w-100 lh-copy f6">
                  <span className="c-muted-1 dib mb3">
                    <FormattedMessage id="store/cartman.cartmanDescription" />
                  </span>
                  <span className="dib c-emphasis mb3">
                    <FormattedMessage id="store/cartman.cartmanWarning" />
                  </span>
                  <Button variation="tertiary" onClick={handleDeactivate}>
                    <span className="ttu">
                      <FormattedMessage id="store/cartman.deactivate" />
                    </span>
                  </Button>
                </div>
              </Fragment>
            ) : currentStep === 'cart-details' ? (
              <CartDetails onBack={handleBack} />
            ) : currentStep === 'add-random-item' ? (
              <AddRandomItem onBack={handleBack} />
            ) : null}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default CartmanSidebar
