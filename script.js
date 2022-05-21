
let myLibrary = [];
const tableBody = document.getElementById('rows');
const count = document.getElementById('count');


function main() {
    addShit();
    displayLibraryTable();
}

function addBookToLibrary(title = '', author = '', pages = 0, read = false) {
    myLibrary.push(new Book(title, author, pages, read));
}

function displayLibraryTable() {

    tableBody.innerHTML = '';

    myLibrary.forEach((book, index) => addRow(book, index));
    count.innerText = myLibrary.length;
}

function addRow(book, index) {
    const row = document.createElement('tr');
    tableBody.appendChild(row);
    addCell(row, index + 1);
    addCell(row, book.title);
    addCell(row, book.author);
    addCell(row, book.pages);
    addCell(row, book.read);
    addButton(row, index);
}

function addCell(row, value) {
    createCell(row).innerText = value;
}

// TODO: this seems horribly wrong, we hates it
function addButton(row, index) {
    createCell(row).innerHTML = `<button onclick=deleteBook(${index}) class="delete">X</button>`;
}

function createCell(row) {
    const cell = document.createElement('td');
    row.appendChild(cell);
    return cell;
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    displayLibraryTable();
}

function addShit() {
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 100, true);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 200, true);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 300, true);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 400, true);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 500, true);
}

function addBunchOfShit() {
   
    for (i = 5; i > 0; i--)
        addShit();

    displayLibraryTable();
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



main();