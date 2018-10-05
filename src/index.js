// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");

  const quoteContainer = document.getElementById("quote-list")
  const formContainer = document.getElementById("new-quote-form")
  const userInput = document.getElementById("new-quote")
  const formSubmit = document.getElementById("submitButton")

  fetch("http://localhost:3000/quotes")
    .then((response) => {
      return response.json()
    })
    .then((quoteJsonObj) => {
      quoteJsonObj.forEach((quote) => {
        const newQuotes = new Quote(quote) //pass the single object inside the iterator
        quoteContainer.innerHTML += newQuotes.render()
      })
    })


  formContainer.addEventListener("submit", function(event) {
    event.preventDefault()
    console.log(event)
    const userInput = document.getElementById("new-quote").value
    const newAuthor = document.getElementById("author").value


    fetch("http://localhost:3000/quotes", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quote: userInput,
        likes: 0,
        author: newAuthor
      })
    })

    quoteContainer.innerHTML += `<li class='quote-card'>
                                    <blockquote class="blockquote">
                                      <p class="mb-0">${userInput}</p>
                                      <footer class="blockquote-footer">${newAuthor}</footer>
                                      <br>
                                      <button class='btn-success'>Likes: <span>0</span></button>
                                      <button id="deleteButton" class='btn-danger'>Delete</button>
                                    </blockquote>
                                  </li>`
  })

  // const likeButton = document.getElementById("likeButton")

  document.addEventListener("click", function(event) {
    console.log(event)
    if (event.target.id === "likeButton") {

      let likeButtonId = event.target.dataset.id

      let foundQuote = Quote.all.find((quote) => {
        return quote.id == likeButtonId
      })

      let likeCount = foundQuote.likes++ //increment of 1

      console.log(likeCount)
      console.log(event.target.children[0].innerText) //innerText is something between tags

      event.target.children[0].innerText = likeCount

      fetch(`http://localhost:3000/quotes/${likeButtonId}`, {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          likes: likeCount
        })
      })
    } //end of if statement
  })

  document.addEventListener("click", function(event) {

    if (event.target.id === "deleteButton") {

      let likeDeleteId = event.target.dataset.id

      let foundQuote = Quote.all.find((quote) => {
        return quote.id == likeDeleteId
      })

    fetch(`http://localhost:3000/quotes/${likeDeleteId}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    document.querySelector('.quote-card').remove()
  }


})



}); //DOM LOADER
