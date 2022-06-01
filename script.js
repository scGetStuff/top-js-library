
let myLibrary = [];
const tableBody = document.getElementById('rows');
const count = document.getElementById('count');
const modal = document.getElementById('modal');
const form = document.getElementById('theForm');

const author = document.getElementById('author');
const title = document.getElementById('title');
const pages = document.getElementById('pages');
const read = document.getElementById('read');


(() => {
    document.getElementById('addDummy').addEventListener('click', addDummyData);
    document.getElementById('showForm').addEventListener('click', showForm);
    document.getElementById('closeForm').addEventListener('click', closeForm);
    form.addEventListener('submit', addBookFromForm);
    document.getElementById('saveLibrary').addEventListener('click', saveLibrary);
    document.getElementById('loadLibrary').addEventListener('click', loadLibrary);

    loadLibrary();
    displayLibraryTable();
})();


function loadLibrary() {
    const test = JSON.parse(sessionStorage.getItem('myLibrary'));
    if (test)
        myLibrary = test;

    displayLibraryTable();
}

function saveLibrary() {
    sessionStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    // dumpStorage();
}

function dumpStorage() {
    console.clear();
    console.log(sessionStorage);
}

function addDummyData() {
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 100, true);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 200, false);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 300, true);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 400, false);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 500, true);
    
    displayLibraryTable();
}

function addBookToLibrary(title = '', author = '', pages = 0, read = false) {
    myLibrary.push(new Book(title, author, pages, read));
}

function addBookFromForm(e) {
    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    displayLibraryTable();
    closeForm();

    // TODO: not a real submit, don't want any page navigation or the add gets lost cause it does not automaticaly save
    e.preventDefault();
}

function displayLibraryTable() {
    tableBody.innerHTML = '';

    if (myLibrary) {
        myLibrary.forEach((book, index) => addRow(book, index));
        count.innerText = myLibrary.length;
    }
}

function addRow(book, index) {
    const row = document.createElement('tr');
    tableBody.appendChild(row);
    addCell(row, index + 1);
    addCell(row, book.title);
    addCell(row, book.author);
    addCell(row, book.pages);
    addReadCheck(row, index, book.read);
    addDeleteButton(row, index);
}

function addCell(row, value) {
    createCell(row).innerText = value;
}

function createCell(row) {
    const cell = document.createElement('td');
    row.appendChild(cell);
    return cell;
}

// TODO: is there a standard approach for generating html?
// comments left for context, i do not like all the DOM code, but the embedded onclick is shitty
function addDeleteButton(row, index) {

    // first pass
    //createCell(row).innerHTML = `<button onclick=deleteBook(${index}) class="delete">X</button>`;

    // second pass
    // this actualy seems worse than the embeded html was
    const button = document.createElement('button');
    button.onclick = deleteBookEvent;
    button.type = 'button';
    button.classList.add('delete');
    button.dataset.index = index;
    button.textContent = 'X';
    createCell(row).appendChild(button);
}

function addReadCheck(row, index, value) {
    // const state = (value == true) ? 'checked' : '';
    // createCell(row).innerHTML = `<input type="checkbox" id="read${index}" name="read${index}" onclick=changeReadStatus(${index}) ${state}>`;

    const check = document.createElement('input');
    check.onclick = changeReadStatusEvnet;
    check.type = 'checkbox';
    check.dataset.index = index;
    check.checked = value;
    createCell(row).appendChild(check);

}

function deleteBookEvent(e) {
    deleteBook(e.target.dataset.index);
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    displayLibraryTable();
}

function changeReadStatusEvnet(e) {
    changeReadStatus(e.target.dataset.index);
}

function changeReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayLibraryTable();
}

function showForm() {
    modal.style.setProperty('visibility', 'visible');
}

function closeForm() {
    form.reset();
    modal.style.setProperty('visibility', 'hidden');
}



function Book(title = '', author = '', pages = 0, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read ? 'has been read' : 'not read yet'}`;
};
