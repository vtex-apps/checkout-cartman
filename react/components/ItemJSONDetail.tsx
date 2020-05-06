import React from 'react'
import { Item } from 'vtex.checkout-graphql'
import JSONView from 'react-json-view'
import { useIntl } from 'react-intl'

import { useHeaderData } from './CartmanContext'

interface Props {
  item: Item
  onBack: () => void
}

const ItemJSONDetail: React.FC<Props> = ({ item, onBack }) => {
  const intl = useIntl()

  useHeaderData(intl.formatMessage({ id: 'store/cartman.itemDetail' }), onBack)

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
