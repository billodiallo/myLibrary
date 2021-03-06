/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
const dbRefObject = firebase.database().ref().child('Books');

let cloudLib = {};
let cloudLibData = [];

dbRefObject.on('value', (snap) => {
  cloudLib = snap.val();
  cloudLibData = cloudLib.myLibrary;

  /* eslint no-use-before-define: "error" */
  /* eslint-env es6 */
  syncData();
  renderTable();
});

function writeUserData() {
  firebase.database().ref('Books').set({
    // eslint-disable-next-line no-use-before-define
    myLibrary,
  });

  // eslint-disable-next-line no-use-before-define
  renderTable();
}

const table = document.getElementById('libraryTable');

function newBook(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  myLibrary.push(this);
  writeUserData();
}

let myLibrary = cloudLibData;
function addBookToLibrary() {
  const newTitle = document.getElementById('newTitle').value;
  const newAuthor = document.getElementById('newAuthor').value;
  const newPages = document.getElementById('newPages').value;
  const newRead = document.getElementById('newRead').value;

  /* eslint no-new: "error" */
  // eslint-disable-next-line no-new
  new newBook(newTitle, newAuthor, newPages, newRead);

  document.getElementById('newTitle').value = '';
  document.getElementById('newAuthor').value = '';
  document.getElementById('newPages').value = '';
  document.getElementById('newRead').value = '';

  // eslint-disable-next-line no-use-before-define
  showForm();
}
/* eslint no-unused-vars: ["error", { "caughtErrors": "none" }] */

// eslint-disable-next-line no-unused-vars
function markRead(index) {
  if (myLibrary[index].read === 'No') {
    myLibrary[index].read = 'Yes';
    document.getElementById(`read${index}`).innerHTML = `<span id='read${index}'>${myLibrary[index].read}</span>`;
  } else {
    myLibrary[index].read = 'No';
    document.getElementById(`read${index}`).innerHTML = `<span id='read${index}'>${myLibrary[index].read}</span>`;
  }
  writeUserData();
}
// eslint-disable-next-line no-unused-vars
function deleteRow(index) {
  if (index > 1) {
    myLibrary.splice(index, index - 1);
  } else if (index === 1) {
    myLibrary.splice(index, index);
  } else if (index === 0) {
    myLibrary.shift();
  }
  writeUserData();
}
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
function renderTable() {
  table.innerHTML = '';
  for (index = 0; index < cloudLibData.length; index++) {
    const newRow = table.insertRow(index);
    newRow.insertCell(0).innerText = cloudLibData[index].title;
    newRow.insertCell(1).innerText = cloudLibData[index].author;
    newRow.insertCell(2).innerText = cloudLibData[index].pages;
    newRow.insertCell(3).innerHTML = `<span id='read${index}'>${cloudLibData[index].read}</span>`;
    newRow.insertCell(4).innerHTML = `<button onclick='markRead(${index})' class='tableButtons' >Check</button>`;
    newRow.insertCell(5).innerHTML = `<button onclick='deleteRow(${index})' class='tableButtons' >Delete</button>`;
  }
}

const hiddenForm = document.getElementById('hiddenForm');

function showForm() {
  hiddenForm.classList.toggle('active');
}

function syncData() {
  for (i = 0; i < cloudLibData.length; i++) {
    myLibrary[i] = cloudLibData[i];
  }
}
