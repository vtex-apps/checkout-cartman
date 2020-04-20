import React, { useEffect } from 'react'
import { Item } from 'vtex.checkout-graphql'
import JSONView from 'react-json-view'

import { useCartman } from './CartmanContext'

interface Props {
  item: Item
}

const ItemJSONDetail: React.FC<Props> = ({ item }) => {
  const { setHeaderData } = useCartman()

  useEffect(
    () =>
      setHeaderData({
        title: 'item detail',
      }),
    [setHeaderData]
  )

  return (
    <div className="ph5 mv5 lh-title">
      <h2>{item.skuName}</h2>
      <JSONView src={item} />
    </div>
  )
}

export default ItemJSONDetail
