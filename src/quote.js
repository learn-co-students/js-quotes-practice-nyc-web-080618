class Quote {

  constructor(quoteObj) {
    this.id = quoteObj.id
    this.quote = quoteObj.quote
    this.likes = quoteObj.likes
    this.author = quoteObj.author
    Quote.all.push(this)
  }

  render() {
    return `<li class='quote-card'>
            <blockquote class="blockquote">
              <p class="mb-0">${this.quote}</p>
              <footer class="blockquote-footer">${this.author}</footer>
              <br>
              <button id="likeButton" data-id=${this.id} class='btn-success'>Likes: <span>${this.likes}</span></button>
              <button id="deleteButton" data-id=${this.id} class='btn-danger'>Delete</button>
            </blockquote>
          </li>`
  }


} //end of class

Quote.all = []
