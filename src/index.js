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

      if(event.target.className === "btn-info"){
        const targetQuoteId = event.target.dataset.id
        const targetQuote = Quote.findQuote(targetQuoteId)
        const quoteInput = document.getElementById('quoteInput')
        const authorInput = document.getElementById('authorInput')
        const submitButton = document.getElementById('submitForm')
        quoteInput.value = targetQuote.quote
        authorInput.value = targetQuote.author
        submitButton.dataset.id = targetQuoteId
      }

      if(event.target.className === "btn-warning"){
        event.preventDefault()
        const targetQuoteId = event.target.dataset.id
        const targetQuote = Quote.findQuote(targetQuoteId)
        const quoteInput = document.getElementById('quoteInput').value
        const authorInput = document.getElementById('authorInput').value
        fetch(`http://localhost:3000/quotes/${targetQuoteId}`, {
          method: 'PATCH',
          headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json"
                    },
          body: JSON.stringify({
            quote: quoteInput,
            author: authorInput
          })
        }).then(res => res.json())
        .then(data => {
          targetQuote.updateQuote(data)
          allList.innerHTML = allQuote.map(quote => quote.render()).join("")
        })
      }

      if(event.target.id === "sortAuthor"){
        let copyArr = [...allQuote]
        let sortedArr = copyArr.sort((a, b) => a.author.localeCompare(b.author))
        if(event.target.innerText === "Sort Quotes by Author: OFF"){
          event.target.innerText = "Sort Quotes by Author: ON"
          allList.innerHTML = sortedArr.map(quote => {
            return quote.render()
          }).join("")
        } else {
          event.target.innerText = "Sort Quotes by Author: OFF"
          allList.innerHTML = allQuote.map(quote => quote.render()).join("")
        }
      }

    })



})
