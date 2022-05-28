
let myLibrary = [];
const tableBody = document.getElementById('rows');
const count = document.getElementById('count');
const modal = document.getElementById('modal');

const author = document.getElementById('author');
const title = document.getElementById('title');
const pages = document.getElementById('pages');
const read = document.getElementById('read');


(() => {
    document.getElementById('addBunch').onclick = addBunchOfData;
    document.getElementById('showForm').onclick = showForm;
    document.getElementById('closeForm').onclick = closeForm;
    document.getElementById('theForm').onsubmit = addBookFromForm;

    addDummyData()
    displayLibraryTable();
})();



function addDummyData() {
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 100, true);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 200, true);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 300, true);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 400, true);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 500, true);
}

function addBookToLibrary(title = '', author = '', pages = 0, read = false) {
    myLibrary.push(new Book(title, author, pages, read));
}

function addBookFromForm() {
    addBookToLibrary(title.value, author.value, pages.value, read.value);
    displayLibraryTable();
    closeForm();
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

function createCell(row) {
    const cell = document.createElement('td');
    row.appendChild(cell);
    return cell;
}

// TODO: is there a standard?
// comments left for context, i realy do not like all the DOM code
// the embedded onclick seems shitty, but not sure what else i could do
function addButton(row, index) {
    
    // first pass
    createCell(row).innerHTML = `<button onclick=deleteBook(${index}) class="delete">X</button>`;

    // second pass
    // this actualy seems worse than the embeded html was
    // const button = document.createElement('button');
    // button.onclick = deleteBookEvent;
    // button.type = 'button';
    // button.classList.add('delete');
    // button.dataset.index = index;
    // button.textContent = 'X';
    // createCell(row).appendChild(button);
}

function deleteBookEvent(e) {
    deleteBook(e.target.dataset.index);
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    displayLibraryTable();
}

function addBunchOfData() {
    for (i = 5; i > 0; i--)
        addDummyData();
    displayLibraryTable();
}

function showForm() {
    modal.style.setProperty('visibility', 'visible');
}

function closeForm() {
    resetForm();
    modal.style.setProperty('visibility', 'hidden');
}

function resetForm() {
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
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
