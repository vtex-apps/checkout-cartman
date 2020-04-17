import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button } from 'vtex.styleguide'
import { OrderForm } from 'vtex.order-manager'
import copy from 'copy-to-clipboard'

import { generateAddToCartURL } from '../utils/cartURLGenerator'

const { useOrderForm } = OrderForm

const Actions: React.FC = () => {
  const [copied, setCopied] = useState(false)
  const { orderForm } = useOrderForm()

  useEffect(() => {
    if (!copied) {
      return
    }

    const id = setTimeout(() => {
      setCopied(false)
    }, 2000)

    return () => clearTimeout(id)
  }, [copied])

  const handleResetCartButton = () => {}

  const handleCopyCart = () => {
    const url = generateAddToCartURL(orderForm)

    copy(url)
    setCopied(true)
  }

  return (
    <div className="pa5 w-100 cf bb b--light-gray tc">
      <span className="mr4">
        <Button disabled={copied} variation="primary" onClick={handleCopyCart}>
          {copied === true ? (
            <FormattedMessage id="store/cartman.copiedCart" />
          ) : (
            <FormattedMessage id="store/cartman.copyCart" />
          )}
        </Button>
      </span>
      <span>
        <Button onClick={handleResetCartButton} variation="secondary">
          <FormattedMessage id="store/cartman.emptyCart" />
        </Button>
      </span>
    </div>
  )
}

export default Actions
