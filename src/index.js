document.addEventListener('DOMContentLoaded', function() {

//step 1, get;
  fetch("http://localhost:3000/quotes")
  .then(r => r.json())
  .then(quoteData => {
    document.getElementById("quote-list").innerHTML = quoteData.map(quote => {
      let newQuote = new Quote(quote);
      return newQuote.render();
    }).join("")
  })

//step 2, create;
  const newQuoteForm = document.getElementById("new-quote-form");

  newQuoteForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let newQuote = event.target.children[0].children[1].value;
    let newAuthor = event.target.children[1].children[1].value;
    //as submitting the form, must use .value to capture the input
    event.target.reset();
    fetch("http://localhost:3000/quotes", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quote: newQuote,
        likes: 0,
        author: newAuthor
      })
    }).then(r => r.json())
    .then(quoteData => {
      let newQuote = new Quote(quoteData)
      document.getElementById("quote-list").innerHTML += newQuote.render();
    })
  })

//step 3, delete
  const quoteList = document.getElementById("quote-list");

  quoteList.addEventListener("click", (event) => {
    if (event.target.className === "btn-danger"){
      let quoteId = event.target.parentElement.parentElement.dataset.id;
      document.querySelector(`[data-id="${quoteId}"]`).remove()
      fetch(`http://localhost:3000/quotes/${quoteId}`, {
        method: "DELETE"
      })
    }
  })

//step 4, likes
  quoteList.addEventListener("click", (event) => {
    if (event.target.className === "btn-success"){
      let quoteId = event.target.parentElement.parentElement.dataset.id;
      let likesNum = +event.target.children[0].innerText + 1;
      event.target.children[0].innerText = likesNum;

      fetch(`http://localhost:3000/quotes/${quoteId}`, {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          likes: likesNum,
        })
      })
    }
  })

//step 5, filter;
  const filterBtn = document.getElementById("btn-filter");
  let filterStatus = false;
  filterBtn.addEventListener("click", (event) => {
    if (filterStatus === false){
      let sortedQuote = allQuotes.slice().sort(function(quote1, quote2){
        return ('' + quote1.author).localeCompare(quote2.author);
      })
      document.getElementById("quote-list").innerHTML = sortedQuote.map(quote => quote.render()).join("");
      filterStatus = !filterStatus;
    } else {
      document.getElementById("quote-list").innerHTML = allQuotes.map(quote => quote.render()).join("");
      filterStatus = !filterStatus;
    }
  })
})
