const quoteList = document.getElementById('quote-list')
const quoteForm = document.getElementById('new-quote-form')

quoteForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const newQuote = document.getElementById('new-quote').value
  const newAuthor = document.getElementById('author').value
  fetch('http://localhost:3000/quotes', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({quote: newQuote, author: newAuthor, likes: 0})
  }).then(res => res.json()).then(data => {
    const quoteObj = new Quote(data)
    quoteList.innerHTML += quoteObj.render()
  })
  quoteForm.reset()
})

document.addEventListener('click',(e) => {
  const quoteId = e.target.parentNode.parentNode.dataset.id
  if(e.target.id === 'delete'){
    fetch(`http://localhost:3000/quotes/${quoteId}`, {
      method: 'DELETE'
    })
    e.target.parentNode.parentNode.remove()
  }else if(e.target.id === 'like'){
    const quoteObj = Quote.findById(quoteId)
    quoteObj.likes++
    fetch(`http://localhost:3000/quotes/${quoteId}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({likes:quoteObj.likes})
    })
    e.target.firstElementChild.innerText = quoteObj.likes
  }
})

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/quotes').then(res => res.json()).then(data => {
    data.forEach(quote => {
      const quoteObj = new Quote(quote)
      quoteList.innerHTML += quoteObj.render()
    })
  })
})
