
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
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 200, false);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 300, true);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 400, false);
    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 500, true);
}

function addBookToLibrary(title = '', author = '', pages = 0, read = false) {
    myLibrary.push(new Book(title, author, pages, read));
}

function addBookFromForm(e) {
    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    displayLibraryTable();
    closeForm();
    // TODO: no real submit and no persistance yet
    // page was refreshing on first add, making it not add, so just bybass default stuff for now
    e.preventDefault();
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
