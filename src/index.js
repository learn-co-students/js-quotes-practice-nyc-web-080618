document.addEventListener("DOMContentLoaded", () => {

  const quoteList = document.getElementById('quote-list')
  const quoteSubmit = document.getElementById('submit')
  const addQuote = document.getElementById('new-quote')
  const addAuthor = document.getElementById('author')

  quoteList.addEventListener('click', event => {
    if (event.target.className === 'btn-success') {
      let likeId = parseInt(event.target.id.split('-')[1])
      let newLike = parseInt(event.target.children[0].innerText) + 1
      event.target.children[0].innerText = newLike

      fetch(`http://localhost:3000/quotes/${likeId}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          likes: newLike
        })
      })

    } else if (event.target.className === 'btn-danger') {
      let quoteId = parseInt(event.target.id.split('-')[1])
      fetch(`http://localhost:3000/quotes/${quoteId}`, {
          method: 'DELETE',
        }) //end of delete fetch
        .then(response => response.json())
        .then(event.target.parentElement.parentElement.remove())


    }
  })




  fetch('http://localhost:3000/quotes')
    .then(response => response.json())
    .then(quotes => {
      quotes.forEach(quote => {
        let newQuote = new Quote(quote)
        quoteList.innerHTML += newQuote.render()
      })
    })

  quoteSubmit.addEventListener('click', event => {
    event.preventDefault()

    fetch('http://localhost:3000/quotes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          id: null,
          quote: addQuote.value,
          author: addAuthor.value,
          likes: 0
        })
      })
      .then(response => response.json())
      .then(quote => {
        let newQuote = new Quote(quote)
        quoteList.innerHTML += newQuote.render()
      })



  })







})