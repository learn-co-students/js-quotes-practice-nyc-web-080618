class Quote {

  static findQuote(id){
    return allQuote.find(quote => quote.id == id)
  }

  constructor(quoteObj){
    this.id = quoteObj.id
    this.quote = quoteObj.quote
    this.likes = quoteObj.likes
    this.author = quoteObj.author
    allQuote.push(this)
  }

  updateQuote(newObj){
    this.quote = newObj.quote
    this.author = newObj.author
    this.likes = newObj.likes
  }

  render(){
    return `<li class='quote-card' id="list-${this.id}">
              <blockquote class="blockquote">
                <p class="mb-0">${this.quote}</p>
                <footer class="blockquote-footer">${this.author}</footer>
                <br>
                <button class='btn-success' data-like="${this.id}">Likes: <span id="like-${this.id}">${this.likes}</span></button>
                <button class='btn-danger' data-delete="${this.id}">Delete</button>
                <button class="btn-info" data-id="${this.id}">Edit</button>
              </blockquote>
            </li>`
  }

}

allQuote = []
