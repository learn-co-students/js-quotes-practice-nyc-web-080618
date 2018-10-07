const allQuotes = []
class Quote {
  constructor({id, quote, likes, author}) {
    this.id = id
    this.quote = quote
    this.likes = likes
    this.author = author
    allQuotes.push(this)
  }
  render() {
    return `<li class='quote-card' data-id=${this.id}>
  <blockquote class="blockquote">
    <p class="mb-0">${this.quote}</p>
    <footer class="blockquote-footer">${this.author}</footer>
    <br>
    <button class='btn-success' id='like'>Likes: <span>${this.likes}</span></button>
    <button class='btn-danger' id='delete'>Delete</button>
  </blockquote>
</li>`
  }

  static findById(id){
    return allQuotes.find(quote => quote.id == id)
  }
}
