document.addEventListener('DOMContentLoaded', (event) => {

const quoteContainerObject = document.getElementById('quote-list')

  fetch('http://localhost:3000/quotes')
  .then(resp => resp.json())
  .then(function(quotes){
    quotes.forEach(function(quote){
      let quoteForDisplay = new Quote(quote)
      quoteContainerObject.innerHTML += quoteForDisplay.renderInitialQuoteDisplay()
    })
  })


  document.addEventListener('click', (event)=> {
    if(event.target.dataset.id == 'add'){
      let quoteToUpdateLikesFor = Quote.findQuoteObjectByQuoteId(event.target.dataset.quoteid)
      fetch(`http://localhost:3000/quotes/${quoteToUpdateLikesFor.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          likes: quoteToUpdateLikesFor.likes += 1
        })
      })
      let elementToUpdate = document.getElementById(`${quoteToUpdateLikesFor.id}`)
      elementToUpdate.innerHTML = quoteToUpdateLikesFor.renderInitialQuoteDisplay()
    } else if(event.target.id == 'newQuoteButton'){
      event.preventDefault()
      const newQuote = document.getElementById('new-quote').value
      const newAuthor = document.getElementById('author').value
      const newObject = {author: newQuote, quote: newQuote, likes: 0}
      fetch('http://localhost:3000/quotes', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newObject)
      }).then(resp => resp.json())
        .then(function(newQuote){
          let objectToShowOnAPage = new Quote(newQuote)
          quoteContainerObject.innerHTML += objectToShowOnAPage.renderInitialQuoteDisplay()
        })



      // quoteContainerObject.innerHTML += newQuoteToBeAdded.renderInitialQuoteDisplay()
    } else if (event.target.dataset.id == 'delete'){

      let objectToBeDeleted = Quote.findQuoteObjectByQuoteId(event.target.dataset.quoteid)
      let arrayOfObjectsNotIncludingOneToBeDeleted = Quote.createArrayOfEverythingButObjectToBeDeleted(event.target.dataset.quoteid)
      // debugger
      fetch(`http://localhost:3000/quotes/${objectToBeDeleted.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(objectToBeDeleted)
      }).then(resp => resp.json())
      quoteContainerObject.innerHTML = ""

      arrayOfObjectsNotIncludingOneToBeDeleted.forEach(function(quote){
        quoteContainerObject.innerHTML += quote.renderInitialQuoteDisplay()
      })
      }
    })



})
