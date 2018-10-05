const allQuotes = []

class Quote {
  constructor(obj) {
    this.id = obj.id
    this.quote = obj.quote
    this.author = obj.author
    this.likes = obj.likes
    allQuotes.push(this)
  }

  render() {
    return (`<li data-id=${this.id} class='quote-card'>
      <blockquote class="blockquote">
        <p class="mb-0">${this.quote}</p>
        <footer class="blockquote-footer">${this.author}</footer>
        <br>
        <button id="like-${this.id}" class='btn-success'>Likes: <span>${this.likes}</span></button>
        <button id="delete-${this.id}" class='btn-danger'>Delete</button>
      </blockquote>
    </li>
      `)
  }
}