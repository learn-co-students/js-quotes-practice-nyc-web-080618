const Quote = (() => {

  const allQuotes = [];

  return class {
    constructor(quoteObj){
      this.id = quoteObj.id;
      this.quote = quoteObj.quote;
      this.likes = quoteObj.likes;
      this.author = quoteObj.author;
      allQuotes.push(this)
    }
  }

  // renderInfo(){
  //   return `<li class='quote-card' data-id="${this.id}">
  //   <blockquote class="blockquote">
  //     <p class="mb-0">${this.quote}</p>
  //     <footer class="blockquote-footer">${this.author}</footer>
  //     <br>
  //     <button class='btn-success'>Likes: <span>${this.likes}</span></button>
  //     <button class='btn-danger'>Delete</button>
  //   </blockquote>
  // </li>`
  // }

})()
