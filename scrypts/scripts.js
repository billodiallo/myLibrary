
const table = document.getElementById('libraryTable');
function newBook(title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    myLibrary.push(this)
   writeUserData()

  }

  //pushes info from input form to create new object, clears form
  
  function addBookToLibrary() {
      let newTitle = document.getElementById('title').value;
      let newAuthor = document.getElementById('author').value;
      let newPages = document.getElementById('pages').value;
      let newRead = document.getElementById('read').value;
     
    new Book(newTitle,newAuthor,newPages,newRead); 
   document.getElementById('newTitle').value= '';
   document.getElementById('newAuthor').value= '';
   document.getElementById('newPages').value= '';
   document.getElementById('newRead').value= '';
      
      
  }
  