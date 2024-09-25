const cartData = () => {
  const cart = document.querySelector('.js-cart')
  const productList = document.querySelector('.js-products-list')
  const cartList = document.querySelector('.js-cart-list')
  const cartEmpty = document.querySelector('.js-cart-empty-container')
  const cartOrder = document.querySelector('.js-cart-order-container')
  const formatter = new Intl.NumberFormat('ru-RU')

  const productInfo = {}

  const calculateTotalCartValue = () => {
    const cartItems = document.querySelectorAll('.js-cart-item')
    const cartTotalPrice = document.querySelector('.js-cart-total-price')

    let totalCartValue = 0
    cartItems.forEach((item) => {
      const itemCount = item.querySelector('.js-current-items')
      const itemPrice = item.querySelector('.js-cart-price')
      const itemTotalPrice =
        parseInt(itemCount.textContent) *
        parseInt(itemPrice.dataset.price.split(' ').join(''))
      itemPrice.textContent = formatter.format(itemTotalPrice)
      totalCartValue += itemTotalPrice
    })
    cartTotalPrice.textContent = formatter.format(totalCartValue)
  }
  calculateTotalCartValue()

  const updateCartItemCount = () => {
    cart.addEventListener('click', (e) => {
      if (!e.target.matches('.js-minus') && !e.target.matches('.js-plus')) {
        return
      }
      let currentItems, minusBtn
      if (e.target.matches('.js-minus') || e.target.matches('.js-plus')) {
        const counter = e.target.closest('.js-counter')
        currentItems = counter.querySelector('.js-current-items')
        minusBtn = counter.querySelector('.js-minus')
      }
      if (e.target.matches('.js-plus')) {
        currentItems.textContent = parseInt(currentItems.textContent) + 1
        minusBtn.classList.remove('disabled')
        calculateTotalCartValue()
      }
      if (e.target.matches('.js-minus')) {
        if (parseInt(currentItems.textContent) > 2) {
          currentItems.textContent = parseInt(currentItems.textContent) - 1
        } else if (parseInt(currentItems.textContent) === 2) {
          currentItems.textContent = parseInt(currentItems.textContent) - 1
          minusBtn.classList.add('disabled')
        }
        calculateTotalCartValue()
      }
    })
  }
  updateCartItemCount()

  const renderProductInCart = () => {
    const li = document.createElement('li')
    li.classList.add('cart-item', 'column', 'js-cart-item')
    li.innerHTML = `<span class="close js-remove"></span>
                  <div class="cartline row jcfs aic" id="${productInfo.id}">
                    <div class="cart-image-container">
                      <img
                        src="${productInfo.photo}"
                        alt=""
                        class="cart-img"
                      />
                    </div>
                    <div class="column">
                      <div class="cart-model row jcfs aic">${productInfo.model}</div>
                      <div class="row jcsb aic">
                        <div class="counter row jcc aic js-counter">
                          <button
                            type="button"
                            class="minus control row jcc aic js-minus disabled"
                          >
                            -
                          </button>
                          <div
                            class="current-items row jcc aic js-current-items"
                          >
                            1
                          </div>
                          <button
                            type="button"
                            class="plus control row jcc aic js-plus"
                          >
                            +
                          </button>
                        </div>
                        <div class="row jcc aic">
                          <span class="cart-price row jcfe js-cart-price" data-price="${productInfo.price}">${productInfo.price}</span>
                          <span class="rouble">₽</span>
                        </div>
                      </div>
                    </div>
                  </div>`
    cartList.append(li)
  }

  const toggleCartStatus = () => {
    if (cart.querySelector('.js-cart-item')) {
      cartOrder.classList.remove('hidden')
      cartEmpty.classList.add('hidden')
    } else {
      cartOrder.classList.add('hidden')
      cartEmpty.classList.remove('hidden')
    }
  }
  toggleCartStatus()

  const addProductToCart = () => {
    productList.addEventListener('click', (e) => {
      if (!e.target.classList.contains('js-buy-button')) return
      if (e.target.classList.contains('js-buy-button')) {
        const product = e.target.closest('.js-product')
        const productModel = product.querySelector('.js-title-card').textContent
        const productPrice = product.querySelector('.js-price-card').textContent
        const productImage = product.querySelector('.js-image-card').src
        const productLink = product
          .querySelector('.js-link-card')
          .getAttribute('id')
        productInfo.id = productLink
        productInfo.model = productModel
        productInfo.price = productPrice
        productInfo.photo = productImage

        const productInCart = cartList.querySelector(`#${productInfo.id}`)
        if (productInCart) {
          const currentItemsProduct =
            productInCart.querySelector('.js-current-items')
          const minusBtn = productInCart.querySelector('.js-minus')
          minusBtn.classList.remove('disabled')
          currentItemsProduct.textContent =
            parseInt(currentItemsProduct.textContent) + 1
        } else {
          renderProductInCart()
        }
        toggleCartStatus()
        calculateTotalCartValue()
      }
    })
  }
  addProductToCart()

  const removeProductFromCart = () => {
    cartList.addEventListener('click', (e) => {
      if (!e.target.classList.contains('js-remove')) return
      if (e.target.classList.contains('js-remove')) {
        const cartItem = e.target.closest('.js-cart-item')
        cartItem.remove()
        toggleCartStatus()
        calculateTotalCartValue()
      }
    })
  }
  removeProductFromCart()
}

export { cartData }
