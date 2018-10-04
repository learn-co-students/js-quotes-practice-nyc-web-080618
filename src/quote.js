class Quote {
  constructor(quote){
    this.id = quote.id
    this.quote = quote.quote
    this.likes = quote.likes
    this.author = quote.author
    Quote.all.push(this)
  }

  renderInitialQuoteDisplay(){
    return `<li id="${this.id}" class='quote-card'>
      <blockquote class="blockquote">
        <p class="mb-0">${this.quote}</p>
        <footer class="blockquote-footer">${this.author}</footer>
        <br>
        <button data-id="add" data-quoteid="${this.id}" class='btn-success'>Likes: <span>${this.likes}</span></button>
        <button data-id="delete" data-quoteid="${this.id}" class='btn-danger'>Delete</button>
      </blockquote>
    </li>`
  }


  static findQuoteObjectByQuoteId(id){
    return Quote.all.find((quote) => {
      return quote.id == id
    })
  }

  static createArrayOfEverythingButObjectToBeDeleted(id){
    let emptyArray = []
    Quote.all.forEach(function(quote){
      if(quote.id != id){
        emptyArray.push(quote)
      } else {

      }

    })
    Quote.all = emptyArray
    return Quote.all
  }
}

Quote.all = []
