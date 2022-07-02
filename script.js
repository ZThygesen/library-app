let myLibrary = [];

function Book(title, author, pages, read, color) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.color = color;
    this.info = function() {
        console.log(`${title} by ${author}, ${pages} pages, ${read ? "read" : "not read yet"}`);
    }
}

// receives and stores input
const form = document.querySelector('form');

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');

// bg images for the different books
const bookColors = ['./images/book1.svg', './images/book2.svg', './images/book3.svg', './images/book4.svg', './images/book5.svg', './images/book6.svg', './images/book7.svg', './images/book8.svg', './images/book9.svg'];
let newBg = '';

// modal functionality
let modal = document.querySelector('.modal');
let modalBg = document.querySelector('.modal-content');
let callModal = document.querySelector('#new-book');
callModal.addEventListener('click', () => {
    modal.classList.remove('hidden');
    newBg = bookColors[Math.floor(Math.random() * bookColors.length)];
    modalBg.style.backgroundImage = `url(${newBg})`;
    books.style.opacity = '0.2';
});

const closeModal = document.querySelector('#close');
closeModal.addEventListener('click', resetForm);

// form submit functionality
form.addEventListener('submit', (e) => addBookToLibrary(e));
function addBookToLibrary(e) {
    e.preventDefault();
    if (titleInput.value === '' || authorInput === '' || pagesInput.value === '') {
        console.log(myLibrary);
        return;
    }
    let book = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked, `url(${newBg})`);
    myLibrary.push(book);
    localStorage.setItem('library', JSON.stringify(myLibrary));
    displayBooks();
    resetForm();
}

// element where the books are added
const books = document.querySelector('.books');

// displays each book in the library
function displayBooks() {
    books.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        let newBook = createBook(i);
        books.appendChild(newBook);
    }
}

// creates a book to add to DOM
function createBook(i) {
    let newBook = document.createElement('div');
    newBook.className = `book`;

    let removeIcon = document.createElement('i');
    removeIcon.addEventListener('click', removeBook);
    removeIcon.className = `fa-solid fa-trash-can fa-2x ${i}`;
    newBook.append(removeIcon);

    let info = document.createElement('div');
    info.className = 'info';

    let title = document.createElement('p');
    let author = document.createElement('p');
    let pages = document.createElement('p');
    let read = document.createElement('label');
    let input = document.createElement('input');

    title.textContent = myLibrary[i].title;
    author.textContent = myLibrary[i].author;
    pages.textContent = `${myLibrary[i].pages} pages`;

    read.setAttribute('for', 'read');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', 'read');
    read.textContent = 'Read';
    input.checked = myLibrary[i].read;
    read.appendChild(input);
    
    info.appendChild(title);
    info.appendChild(author);
    info.appendChild(pages);
    info.appendChild(read);

    newBook.className = `book ${i}`;
    newBook.style.backgroundImage = myLibrary[i].color;
    newBook.appendChild(info);

    return newBook;
}

// resets form
function resetForm() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readInput.checked = false;
    modal.classList.add('hidden');
    books.style.opacity = '1.0';
}

// removed a book from the library
function removeBook() {
    myLibrary.splice(this.classList[3], 1);
    localStorage.setItem('library', JSON.stringify(myLibrary));
    displayBooks();
}

// local storage for books
myLibrary = JSON.parse(localStorage.getItem('library'));

displayBooks();
