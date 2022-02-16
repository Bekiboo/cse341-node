const addOneToCart = (btn) => {
  const prodId = btn.parentNode.querySelector('[name=productId]').value
  const csrf = btn.parentNode.querySelector('[name=_csrf]').value

  btn.disabled = true
  
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
    })
    .catch((err) => {
      console.log(err)
    })
}

const removeOneFromCart = (btn) => {
  const prodId = btn.parentNode.querySelector('[name=productId]').value
  const csrf = btn.parentNode.querySelector('[name=_csrf]').value

  btn.disabled = true
  
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
    })
    .catch((err) => {
      console.log(err)
    })
}
