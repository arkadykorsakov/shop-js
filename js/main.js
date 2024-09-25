import { cartData } from './modules/cartData.js'
import { closeCart, openCart } from './modules/cartPopup.js'
import { paginate } from './modules/pagination.js'
import products from './products.js'

window.addEventListener('DOMContentLoaded', () => {
  const productContainer = document.querySelector('.js-products-list')
  paginate(products, productContainer)
  openCart()
  closeCart()
  cartData()
})
