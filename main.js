
let myLibrary = [];
const tableBody = document.getElementById('rows');
const count = document.getElementById('count');



function main() {
    console.clear();

    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 100, true);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 200, true);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 300, true);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 400, true);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 500, true);

    myLibrary.forEach(book => addRow(book));
    count.innerText = myLibrary.length;
}

function addBookToLibrary(title = '', author = '', pages = 0, read = false) {
    myLibrary.push(new Book(title, author, pages, read));
}


function addRow(book) {
    const row = document.createElement('tr');
    tableBody.appendChild(row);
    addCell(row, book.title);
    addCell(row, book.author);
    addCell(row, book.pages);
    addCell(row, book.read);
}

function addCell(row, value) {
    const cell = document.createElement('td');
    row.appendChild(cell);
    cell.innerText = value;
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