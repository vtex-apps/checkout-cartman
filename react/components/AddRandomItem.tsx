import React, { useEffect, useState, useRef } from 'react'
import { useLazyQuery } from 'react-apollo'
import { useIntl, FormattedMessage } from 'react-intl'
import { Alert, Input, Button } from 'vtex.styleguide'
import { OrderItems } from 'vtex.order-items'

import SEARCH_PRODUCTS_QUERY from '../graphql/productsQuery.graphql'
import { useHeaderData } from './CartmanContext'

const { useOrderItems } = OrderItems

interface SearchSpec {
  numberOfItems: string
  itemsQuantity: string
  categoryId?: string
  brandId?: string
  collectionId?: string
  priceFrom?: string
  priceTo?: string
}

interface Seller {
  sellerId: string
}

interface Item {
  itemId: string
  sellers: Seller[]
}

interface Product {
  items: Item[]
}

interface ProductsQuery {
  products: Product[]
}

interface ProductsQueryVariables {
  categoryId?: string
  collectionId?: string
  priceRange?: string
  map?: string
  query?: string
}

const AddRandomItem: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const { addItem } = useOrderItems()
  const intl = useIntl()
  const [searchProducts, { data, loading }] = useLazyQuery<
    ProductsQuery,
    ProductsQueryVariables
  >(SEARCH_PRODUCTS_QUERY, { fetchPolicy: 'network-only' })

  const [searchSpec, setSearchSpec] = useState<SearchSpec>({
    numberOfItems: '1',
    itemsQuantity: '1',
  })

  const searchSpecRef = useRef(searchSpec)

  useEffect(() => {
    searchSpecRef.current = searchSpec
  }, [searchSpec])

  useHeaderData(intl.formatMessage({ id: 'store/cartman.addRandom' }), onBack)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
    const {
      target: { name, value },
    } = evt

    setSearchSpec(prevState => ({
      ...prevState,
      [name as keyof SearchSpec]: value,
    }))
  }

  const handleSubmit: React.FormEventHandler = evt => {
    evt.preventDefault()

    const priceRange =
      searchSpec.priceFrom && searchSpec.priceTo
        ? `${searchSpec.priceFrom} TO ${searchSpec.priceTo}`
        : undefined

    searchProducts({
      variables: {
        categoryId: searchSpec.categoryId,
        collectionId: searchSpec.collectionId,
        map: searchSpec.brandId ? 'b' : undefined,
        query: searchSpec.brandId,
        priceRange,
      },
    })
  }

  useEffect(() => {
    if (loading || !data) {
      return
    }

    const skus = data.products.reduce<Item[]>(
      (skuList, { items }) => skuList.concat(items),
      []
    )

    const selectedSkus = skus
      .map(sku => ({ key: Math.random(), value: sku }))
      .sort((a, b) => a.key - b.key)
      .map(({ value }) => value)
      .slice(0, +searchSpecRef.current.numberOfItems)

    addItem(
      selectedSkus.map(({ itemId, sellers }) => ({
        id: itemId,
        quantity: +searchSpecRef.current.itemsQuantity,
        seller: sellers[0]?.sellerId ?? '1',
      }))
    )
  }, [loading, data, addItem])

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    if (value !== '') {
      return
    }

    setSearchSpec(prevSpec => ({
      ...prevSpec,
      [name]: '1',
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="ph5 mv5">
      <div className="lh-copy f6 mb6">
        <Alert>
          <FormattedMessage id="store/cartman.addRandomMessage" />
        </Alert>
      </div>

      <div className="pb4">
        <Input
          label={<FormattedMessage id="store/cartman.numberOfItems" />}
          autoComplete="off"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onChange={handleChange}
          value={searchSpec.numberOfItems}
          name="numberOfItems"
          onBlur={handleBlur}
        />
      </div>
      <div className="pb4">
        <Input
          label={<FormattedMessage id="store/cartman.quantityOfEachItem" />}
          autoComplete="off"
          onChange={handleChange}
          name="itemsQuantity"
          value={searchSpec.itemsQuantity}
          onBlur={handleBlur}
        />
      </div>
      <div className="pb4">
        <Input
          label={<FormattedMessage id="store/cartman.categoryId" />}
          autoComplete="off"
          onChange={handleChange}
          name="categoryId"
          value={searchSpec.categoryId}
        />
      </div>
      <div className="pb4">
        <Input
          label={<FormattedMessage id="store/cartman.brandId" />}
          autoComplete="off"
          onChange={handleChange}
          name="brandId"
          value={searchSpec.brandId}
        />
      </div>
      <div className="pb4">
        <Input
          label={<FormattedMessage id="store/cartman.collectionId" />}
          autoComplete="off"
          onChange={handleChange}
          name="collectionId"
          value={searchSpec.collectionId}
        />
      </div>
      <div className="pb4 cf">
        <div className="fl w-50 pr3">
          <Input
            label={<FormattedMessage id="store/cartman.priceFrom" />}
            autoComplete="off"
            onChange={handleChange}
            name="priceFrom"
            value={searchSpec.priceFrom}
            placeholder={intl.formatMessage({
              id: 'store/cartman.priceFromPlaceholder',
            })}
          />
        </div>
        <div className="fl w-50 pl3">
          <Input
            label={<FormattedMessage id="store/cartman.priceTo" />}
            autoComplete="off"
            onChange={handleChange}
            name="priceTo"
            value={searchSpec.priceTo}
            placeholder={intl.formatMessage({
              id: 'store/cartman.priceToPlaceholder',
            })}
          />
        </div>
      </div>

      <div className="tc mt5">
        <Button type="submit" disabled={loading} isLoading={loading}>
          <FormattedMessage id="store/cartman.addItemsToCart" />
        </Button>
      </div>
    </form>
  )
}

export default AddRandomItem
