// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.

// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
document.addEventListener("DOMContentLoaded", ()=>{

  const quoteList = document.getElementById('quote-list')
  const createNewForm= document.getElementById('new-quote-form')
  const likeButton = document.getElementsByClassName('btn-success')
  // render all info
  fetch('http://localhost:3000/quotes')
    .then(res=> res.json())
    .then(resJson => {
      resJson.forEach(quoteObj => {
        const newQuote = new Quote(quoteObj)
        quoteList.innerHTML += newQuote.render()
      })
    }) // end of get request
  createNewForm.addEventListener('submit', e=>{
    e.preventDefault()
    let quoteInput =document.getElementById('new-quote').value
    let authorInput = document.getElementById('author').value
    fetch('http://localhost:3000/quotes',
    {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        quote: quoteInput,
        likes:0,
        author: authorInput
      })
    }).then (res=> res.json())
      .then(resJson=> {
        let new_quote = new Quote(resJson)
        quoteList.innerHTML += new_quote.render()
      })
      e.target.reset()
  })
  /// like button
  document.addEventListener('click', e=> {
    // likeButton.addEventListener('click', e=> {

    if (e.target.className ==="btn-success"){
      e.preventDefault()
      let likeId = e.target.dataset.likeid
      let targetQuote = Quote.findById(likeId)
      let likeCount = e.target.getElementsByTagName('span')[0]
      let likeValue = parseInt(likeCount.innerText) + 1
      // likeCount.innerText= parseInt(likeCount.innerText) + 1
      fetch(`http://localhost:3000/quotes/${likeId}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          likes: `${likeValue}`
        })
      }).then(res=> res.json())
        .then(resJson => {
          targetQuote.likes = resJson.likes
          likeCount.innerText =targetQuote.likes;

        })

    } else if(e.target.className ==="btn-danger"){
        e.preventDefault()
      let deleteId =e.target.dataset.deleteid
      let targetQuote = Quote.findById(deleteId)
      fetch (`http://localhost:3000/quotes/${deleteId}`,
        {method: 'DELETE'
      }).then(res => res.json())
        .then(resJson => {
          Quote.deleteById(deleteId)
          const deleteDiv = document.getElementById(`quote-${deleteId}`)
          deleteDiv.remove()
        })
    }
  })
})//end of Loaded
