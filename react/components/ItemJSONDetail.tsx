import React, { useEffect } from 'react'
import { Item } from 'vtex.checkout-graphql'
import JSONView from 'react-json-view'
import { useIntl } from 'react-intl'

import { useCartman } from './CartmanContext'

interface Props {
  item: Item
  onBack: () => void
}

const ItemJSONDetail: React.FC<Props> = ({ item, onBack }) => {
  const { setHeaderData } = useCartman()
  const intl = useIntl()

  useEffect(
    () =>
      setHeaderData({
        title: intl.formatMessage({ id: 'store/cartman.itemDetail' }),
        backAction: onBack,
      }),
    [setHeaderData, intl, onBack]
  )

  return (
    <div className="ph5 mv5 lh-title">
      <h2>{item.skuName}</h2>
      <div className="f6">
        <JSONView src={item} />
      </div>
    </div>
  )
}

export default ItemJSONDetail
