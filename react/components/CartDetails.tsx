import React, { Fragment, useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { OrderForm } from 'vtex.order-manager'
import { Button } from 'vtex.styleguide'
import { Item } from 'vtex.checkout-graphql'

import { useCartman } from './CartmanContext'
import ItemJSONDetail from './ItemJSONDetail'

const { useOrderForm } = OrderForm

const CartDetails: React.FC<{ onBackClick?: () => void }> = ({
  onBackClick,
}) => {
  const {
    orderForm: { marketingData, items },
  } = useOrderForm()

  const hasMarketingData =
    marketingData.utmSource ??
    marketingData.utmMedium ??
    marketingData.utmCampaign

  const [detailedItem, setDetailedItem] = useState<Item | null>(null)

  const { setHeaderData } = useCartman()

  useEffect(
    () =>
      setHeaderData({
        title: 'Cart Details',
        backAction: onBackClick,
      }),
    [setHeaderData, onBackClick]
  )

  const handleSelectItem = (item: Item) => {
    setDetailedItem(item)
  }

  const handleDeselectItem = () => {
    setDetailedItem(null)
  }

  if (detailedItem) {
    return <ItemJSONDetail item={detailedItem} onBack={handleDeselectItem} />
  }

  return (
    <div className="ph5 mv5 lh-title">
      <div className="mb5">
        <h2 className="f4 mb3">
          <FormattedMessage id="store/cartman.marketingData" />
        </h2>
        {!hasMarketingData ? (
          <p className="c-muted-1">
            <FormattedMessage id="store/cartman.noUtms" />
          </p>
        ) : (
          <Fragment>
            <p>
              <FormattedMessage
                id="store/cartman.utmSource"
                values={{ source: marketingData.utmSource }}
              />
            </p>
            <p>
              <FormattedMessage
                id="store/cartman.utmMedium"
                values={{ medium: marketingData.utmMedium }}
              />
            </p>
            <p>
              <FormattedMessage
                id="store/cartman.utmCampaign"
                values={{ campaign: marketingData.utmCampaign }}
              />
            </p>
            <p>
              <FormattedMessage
                id="store/cartman.coupon"
                values={{ coupon: marketingData.coupon }}
              />
            </p>
          </Fragment>
        )}
      </div>

      <div>
        <h2 className="f4 mb3">
          <FormattedMessage id="store/cartman.items" />
        </h2>
        {!items.length ? (
          <p className="c-muted-1">
            <FormattedMessage id="store/cartman.noItems" />
          </p>
        ) : (
          items.map(item => (
            <div className="mb4" key={item.id}>
              <h3 className="f5 fw5 mb3">{item.skuName}</h3>
              <p>
                <FormattedMessage
                  id="store/cartman.categoryIds"
                  values={{ categoryIds: item.productCategoryIds }}
                />
              </p>
              <p>
                <FormattedMessage
                  id="store/cartman.productId"
                  values={{ productId: item.productId }}
                />
              </p>
              <p>
                <FormattedMessage
                  id="store/cartman.quantity"
                  values={{ quantity: item.quantity }}
                />
              </p>
              <p>
                <FormattedMessage
                  id="store/cartman.skuId"
                  values={{ skuId: item.id }}
                />
              </p>
              <div className="mv3">
                <Button
                  variation="secondary"
                  onClick={() => handleSelectItem(item)}
                >
                  <FormattedMessage id="store/cartman.viewAllDetails" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CartDetails
