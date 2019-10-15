//Es5

//Book Constructor
function Book (title, author,isbn){
  this.title = title;
  this.author= author;
  this.isbn = isbn;
}
//Ui Constructor

console.log(today)
function Ui (){}
//Add Book to List
  Ui.prototype.addBookToList =function(book){
    const list = document.getElementById('book-list');

//Create tr
const row = document.createElement('tr');
//insert cols

row.innerHTML= ` <td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href='#' class= 'delete'>X</a></td>
`;
list.appendChild(row);
    
}
Ui.prototype.clearFields= function(){
document.getElementById('title').value = '';
document.getElementById('author').value = '';
document.getElementById('isbn').value = '';
}
Ui.prototype.showAlert= function(message, className){
  //Create div
  const div = document.createElement('div');
  div.className = `alert ${className}`
// Add text
div.appendChild(document.createTextNode(message))

//Get parent
const container = document.querySelector('.container');
const form = document.querySelector('#book-form');
container.insertBefore(div, form);

//Timer
setTimeout(function() {
  document.querySelector('.alert').remove()
}, 3000);
}
Ui.prototype.deleteBook= function(target){
if(target.className === 'delete'){
  target.parentElement.parentElement.remove()
}
}
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
ui.addBookToList(book)
//Show success
ui.showAlert('Book added', 'success')
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
