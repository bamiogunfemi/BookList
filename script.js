//Es6

class Book{
constructor(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;

}
}

class Ui{
addBookToList(book){
    const list = document.getElementById('book-list');

    //Create tr
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML= `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class= 'delete'>X</a></td>
    `;
    list.appendChild(row);
    
}
showAlert(message, className){
      //Create div
      const div = document.createElement('div');
      div.className = `alert ${className}`
      // Add text
      div.appendChild(document.createTextNode(message));

       //Get parent
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);

      //Timer
      setTimeout(function() {
        document.querySelector('.alert').remove()
      }, 3000);
    }
  
deleteBook(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
  }
clearFields(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
  }

}
//Local Storage
class Store{
  static getBooks(){
    let books;
    if (localStorage.getItem('books')=== null){
       books = [];
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books
  }
  static displayBooks(){
    const books = Store.getBooks();
    books.forEach(function(book){
      const ui = new Ui   
      
      //Add book to Ui
      ui.addBookToList(book);
    })
  }

  static addBooks(book){
   const books = Store.getBooks();
   books.push(book);
   localStorage.setItem('books', JSON.stringify(books))

  }
  static removeBooks(){
    
  }
}
//Dom load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event Listeners for add
document.getElementById('book-form').addEventListener('submit',
function(e){
  //Get Form Values
const title = document.querySelector('#title').value,
author = document.querySelector('#author').value,
isbn = document.querySelector('#isbn').value;

//Instantaiting a book
const book = new Book(title, author, isbn);

// console.log(book)
//instantiate Ui object
const ui = new Ui();


//Validate 
if(title === '' || author === '' || isbn === ''){
  //Error
  ui.showAlert('Please fill in all fields', 'error')
}else{
//Add book to list
ui.addBookToList(book);

//add to store
Store.addBooks();
//Show success
ui.showAlert('Book added', 'success');
//Clear fields
ui.clearFields();
  e.preventDefault();
}});

//Event Listner for del

document.getElementById('book-list').addEventListener('click', function(e){

  const ui = new Ui ();
  ui.deleteBook(e.target);

  //show alert
  ui.showAlert('Book removed', 'success')
  e.preventDefault()
})

