import { OrderForm } from 'vtex.checkout-graphql'

export function generateAddToCartURL(orderForm: OrderForm) {
  const orderItems = orderForm.items.map(item => ({
    skuId: item.id,
    quantity: item.quantity,
    // item don't have `seller`
    seller: 1,
  }))

  if (orderItems.length === 0) return `${window.location.origin}/checkout/`

  const queryString = orderItems
    .map(item => `sku=${item.skuId}&qty=${item.quantity}&seller=${item.seller}`)
    .join('&')

  return `${window.location.origin}/cart/add?${queryString}`
}
