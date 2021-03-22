import React, { useMemo, Suspense } from 'react'
import { OrderForm } from 'vtex.order-manager'

import { ALLOWED_DOMAINS } from './utils/constants'

const { useOrderForm } = OrderForm

const CartmanBubble = React.lazy(() => import('./components/CartmanBubble'))

const Cartman: React.FC = () => {
  const { orderForm } = useOrderForm()

  const shouldRenderCartman = useMemo(() => {
    const allowedDomain = ALLOWED_DOMAINS.some(
      domain => window.location.href.search(domain) !== -1
    )

    const isCallCenterOperator = orderForm.userType === 'CALL_CENTER_OPERATOR'

    return allowedDomain || isCallCenterOperator
  }, [orderForm.userType])

  if (!shouldRenderCartman) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <CartmanBubble />
    </Suspense>
  )
}

export default Cartman
