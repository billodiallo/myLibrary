//firestore below
const dbRefObject = firebase.database().ref().child('Books')

let cloudLib = {};
let cloudLibData = []

dbRefObject.on('value', snap => {
  //console.log(snap.val())
  cloudLib = snap.val();
  cloudLibData = cloudLib["myLibrary"];
  let myLibrary = cloudLibData;
  syncData()
  renderTable()
})

function writeUserData() {
  firebase.database().ref('Books').set({
    myLibrary
  });

  renderTable()
}

const table = document.getElementById('libraryTable');

//creates new book object
function newBook(title, author, pages, read) {

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  myLibrary.push(this)
   writeUserData()

  //console.table(this);
}

let myLibrary = cloudLibData;

//pushes info from input form to create new object, clears form
function addBookToLibrary () {
  let newTitle = document.getElementById('newTitle').value;
  let newAuthor = document.getElementById('newAuthor').value;
  let newPages = document.getElementById('newPages').value;
  let newRead = document.getElementById('newRead').value;
  new newBook(newTitle, newAuthor, newPages, newRead);

  document.getElementById('newTitle').value = '';
  document.getElementById('newAuthor').value = '';
  document.getElementById('newPages').value = '';
  document.getElementById('newRead').value = '';

  showForm()
}

//markes read as Yes/No
function markRead(index) {
  if (myLibrary[index].read == 'No') {
    myLibrary[index].read = 'Yes'
    document.getElementById(`read${index}`).innerHTML = `<span id='read${index}'>${myLibrary[index].read}</span>`
  } else {
    myLibrary[index].read = 'No'
    document.getElementById(`read${index}`).innerHTML = `<span id='read${index}'>${myLibrary[index].read}</span>`
  }
  writeUserData()
}

//deletes a single array object
function deleteRow(index) {
  if (index > 1) {
  myLibrary.splice(index, index-1);
  } else if (index == 1) {
    myLibrary.splice(index, index);
  } else if (index == 0) {
    myLibrary.shift();
  }
  writeUserData()
}

//is called every time the array is modified
function renderTable() {
  table.innerHTML = ''
  for (index = 0; index < cloudLibData.length; index++) {
    let newRow = table.insertRow(index);
    newRow.insertCell(0).innerText = cloudLibData[index].title;
    newRow.insertCell(1).innerText = cloudLibData[index].author;
    newRow.insertCell(2).innerText = cloudLibData[index].pages;
    newRow.insertCell(3).innerHTML = `<span id='read${index}'>${cloudLibData[index].read}</span>`;
    newRow.insertCell(4).innerHTML = `<button onclick='markRead(${index})' class='tableButtons' >Check</button>`;
    newRow.insertCell(5).innerHTML = `<button onclick='deleteRow(${index})' class='tableButtons' >Delete</button>`
  }
  
}

let hiddenForm = document.getElementById('hiddenForm')
//toggles the input form opacity and z-index
function showForm() {
  hiddenForm.classList.toggle('active')
}


//const book1 = new newBook('American Gods', 'Neil Gaiman', 465, 'no')

function syncData() {
  for (i = 0; i < cloudLibData.length; i++) {
    myLibrary[i] = cloudLibData[i]
  }
}



