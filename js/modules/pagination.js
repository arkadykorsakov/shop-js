import { rendersProductCards } from './productCards.js'

const paginate = (products, container) => {
  let productCount = 7
  let currentPage = 1

  const pagination = document.querySelector('.js-pagination')
  const btnPrevPagination = document.querySelector('.js-pagination-btn-prev')
  const btnNextPagination = document.querySelector('.js-pagination-btn-next')

  const rendersProducts = (products, numberOfProducts, page) => {
    container.innerHTML = ''
    const firstProductIndex = numberOfProducts * page - numberOfProducts
    const lastProductIndex = numberOfProducts + firstProductIndex
    const productsOnPage = products.slice(firstProductIndex, lastProductIndex)
    rendersProductCards(productsOnPage, container)
  }

  const renderPagination = (products, numberOfProducts) => {
    const pagesCount = Math.ceil(products.length / productCount)
    const ul = document.querySelector('.js-pagination-list')
    for (let i = 1; i <= pagesCount; i++) {
      const li = renderBtn(i)
      ul.appendChild(li)
    }
    pagination.classList.remove('hidden')
  }

  const renderBtn = (page) => {
    const li = document.createElement('li')
    li.classList.add('pagination-item', 'row', 'jcc', 'aic')
    li.textContent = page
    if (currentPage === page) {
      li.classList.add('active')
    }
    return li
  }

  const updatePagination = () => {
    pagination.addEventListener('click', (e) => {
      if (!e.target.closest('.pagination-item')) return
      if (e.target.closest('.pagination-item')) {
        currentPage = +e.target.textContent
        rendersProducts(products, productCount, currentPage)
        let currentLi = document.querySelector('.pagination-item.active')
        currentLi.classList.remove('active')
        e.target.classList.add('active')
      }
    })
  }

  rendersProducts(products, productCount, currentPage)
  renderPagination(products, productCount)
  updatePagination()

  const handlePagination = (e) => {
    const liElements = document.querySelectorAll('.pagination-item')
    const currentActiveLi = document.querySelector('.pagination-item.active')
    let newActiveLi

    if (e.target.closest('.js-pagination-btn-next')) {
      if (+currentActiveLi.textContent < liElements.length) {
        newActiveLi = currentActiveLi.nextElementSibling
        currentPage++
      }
    } else {
      if (+currentActiveLi.textContent > 1) {
        newActiveLi = currentActiveLi.previousElementSibling
        currentPage--
      }
    }

    if (newActiveLi) {
      currentActiveLi.classList.remove('active')
      newActiveLi.classList.add('active')
      rendersProducts(products, productCount, currentPage)
    }
  }

  btnNextPagination.addEventListener('click', handlePagination)
  btnPrevPagination.addEventListener('click', handlePagination)
}

export { paginate }
