const addOneToCart = (btn) => {
  const prodId = btn.parentNode.querySelector('[name=productId]').value
  const csrf = btn.parentNode.querySelector('[name=_csrf]').value

  btn.disabled = true
  btn.style.opacity = '50%'

  fetch('/cart-add/' + prodId, {
    method: 'PATCH',
    headers: {
      'csrf-token': csrf,
    },
  })
    .then((result) => {
      return result.json()
    })
    .then((data) => {
      console.log('quantity:', data.quantity)
      const h2 = document.getElementById(`${prodId}`)
      h2.innerHTML = `Quantity: ${data.quantity}`
      btn.disabled = false
      btn.style.opacity = '100%'
    })
    .catch((err) => {
      console.log(err)
    })
}

const removeOneFromCart = (btn) => {
  const prodId = btn.parentNode.querySelector('[name=productId]').value
  const csrf = btn.parentNode.querySelector('[name=_csrf]').value

  btn.disabled = true
  btn.style.opacity = '50%'

  fetch('/cart-remove/' + prodId, {
    method: 'PATCH',
    headers: {
      'csrf-token': csrf,
    },
  })
    .then((result) => {
      return result.json()
    })
    .then((data) => {
      console.log('quantity:', data.quantity)
      const h2 = document.getElementById(`${prodId}`)
      h2.innerHTML = `Quantity: ${data.quantity}`
      btn.disabled = false
      btn.style.opacity = '100%'
    })
    .catch((err) => {
      console.log(err)
    })
}

const deleteProduct = (btn) => {
  const prodId = btn.parentNode.querySelector('[name=productId]').value
  const csrf = btn.parentNode.querySelector('[name=_csrf]').value

  const productElement = btn.closest('li')

  fetch('/cart-delete-item/' + prodId, {
    method: 'DELETE',
    headers: {
      'csrf-token': csrf,
    },
  })
    .then((result) => {
      return result.json()
    })
    .then(data => {
        console.log(data);
        // productElement.remove() only for modern browsers
        productElement.parentNode.removeChild(productElement)
    })
    .catch((err) => {
      console.log(err)
    })
}
