friendForm = document.querySelector('#friends')

friendForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const numInput = document.querySelector('#num-friends');

  for (const num in range(numInput)) {
    document.querySelector('#emails').insertAdjacentHTML(
      'beforeend', 
      '<label for="email-`%{num}`">Email</label><input type="text" name="email" id="email-`%{num}`" required>'
      )
  }
})