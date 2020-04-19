console.log('Client side javascript loaded')

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const value = searchInput.value
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  fetch('http://localhost:3000/weather?address=' + value).then((res) => {
  res.json().then((data) => {
    if (data.err) {
      messageOne.textContent = data.err
    } else {
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
    }
  })
})
})