// firestore below
/* eslint-disable */
const dbRefObject = firebase.database().ref().child('Books')
/* eslint-enable */
let cloudLib = {};
let cloudLibData = []

dbRefObject.on('value', snap => {
  //console.log(snap.val())
  cloudLib = snap.val();
  cloudLibData = cloudLib["myLibrary"];
  /* eslint-disable */
  let myLibrary = cloudLibData;
  syncData()
  renderTable()
})
/* eslint-enable */
/* eslint-disable */
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
/* eslint-enable */
//pushes info from input form to create new object, clears form
/* eslint-disable */
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
/* eslint-enable */
/* eslint-disable */
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
/* eslint-enable */
function renderTable() {
  table.innerHTML = ''
  /* eslint-disable */
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
/* eslint-enable */
let hiddenForm = document.getElementById('hiddenForm')
function showForm() {
  hiddenForm.classList.toggle('active')
}

/* eslint-disable */
function syncData() {
  for (i = 0; i < cloudLibData.length; i++) {
    myLibrary[i] = cloudLibData[i]
  }
}
/* eslint-enable */