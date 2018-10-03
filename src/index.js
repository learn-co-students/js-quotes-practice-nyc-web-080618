// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
document.addEventListener('DOMContentLoaded', () => {

  const allList = document.getElementById('quote-list')
  const quoteForm = document.getElementById('new-quote-form')

    fetch('http://localhost:3000/quotes')
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      allList.innerHTML = data.map(quoteObj => {
        let newQuote = new Quote(quoteObj)
        return newQuote.render()
      }).join("")
    })

  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newQuote = document.getElementById("new-quote").value
    const newAuthor = document.getElementById('author').value
      fetch('http://localhost:3000/quotes', {
        method: 'POST',
        headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  },
        body: JSON.stringify({
          quote: newQuote,
          author: newAuthor,
          likes: 0
        })
      }).then(res => res.json())
      .then(data => {
        let newdata = new Quote(data)
        allList.innerHTML += newdata.render()
      })
      event.target.reset()
    })

    document.addEventListener('click', (event) => {
      if(event.target.className === "btn-success"){
        const targetQuoteId = event.target.dataset.like
        const targetQuote = Quote.findQuote(targetQuoteId)
        const like = document.getElementById(`like-${targetQuoteId}`)
        like.innerHTML++
        fetch(`http://localhost:3000/quotes/${targetQuoteId}`, {
          method: 'PATCH',
          headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json"
                    },
          body: JSON.stringify({
            likes: like.innerHTML
          })
        })
      }

      if(event.target.className === "btn-danger"){
        const targetQuoteId = event.target.dataset.delete
        const targetQuote = Quote.findQuote(targetQuoteId)

        fetch(`http://localhost:3000/quotes/${targetQuoteId}`, {
          method: 'DELETE'
        })
        .then(res => res.json())
        document.getElementById(`list-${targetQuoteId}`).remove()
      }
    })



})
