const Quote = (()=> {
  const allQuotes = []
  return class{
    constructor(quoteJSON){
      this.id = quoteJSON.id
      this.quote = quoteJSON.quote
      this.likes =quoteJSON.likes
      this.author = quoteJSON.author
      allQuotes.push(this)
    }
    static findById(quoteId){
      return allQuotes.find(quote=> quote.id == quoteId)
    }

    static deleteById(quoteId){
      const index = allQuotes.indexOf(Quote.findById(quoteId))
      allQuotes.splice(index,1)
    }
    // updateQuote(newQuoteDetail){
    //   this.
    // }
    render(){
      return `
      <li class='quote-card' id= "quote-${this.id}">
     <blockquote class="blockquote">
     <p class="mb-${this.id}">${this.quote}</p>
     <footer class="blockquote-footer">${this.author}</footer>
     <br>
     <button class='btn-success' data-likeId = "${this.id}">Likes: <span>${this.likes}</span></button>
     <button class='btn-danger' data-deleteId = "${this.id}">Delete</button>
    </blockquote>
      </li>`
    }
  }
})()
