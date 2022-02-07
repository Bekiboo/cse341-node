const backdrop = document.querySelector('.backdrop')
const sideDrawer = document.querySelector('.mobile-nav')
const menuToggle = document.querySelector('#side-menu-toggle')

function backdropClickHandler() {
  backdrop.style.display = 'none'
  sideDrawer.classList.remove('open')
}

function menuToggleClickHandler() {
  backdrop.style.display = 'block'
  sideDrawer.classList.add('open')
}

backdrop.addEventListener('click', backdropClickHandler)
menuToggle.addEventListener('click', menuToggleClickHandler)

// -------------------- MODAL --------------------
// Get the modal
const modal = document.getElementById('myModal')

if (modal !== null) {
  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName('close')[0]

  // When the user clicks on the button, open the modal
  // btn.onclick = function () {
  //   modal.style.display = 'block'
  // }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = 'none'
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none'
    }
  }
}
