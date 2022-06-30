let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
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


const bookColors = ['./images/blue.svg', './images/dark_purple.svg', './images/green.svg', './images/grey.svg', './images/orange.svg', './images/peach.svg', './images/purple.svg', './images/red.svg'];

const modalBg = document.querySelector('.modal-content');

const modal = document.querySelector('.modal');
const callModal = document.querySelector('#new-book');
callModal.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modalBg.style.backgroundImage = `url(${bookColors[Math.floor(Math.random() * bookColors.length)]}`;
});

const closeModal = document.querySelector('#close');
closeModal.addEventListener('click', resetForm);

form.addEventListener('submit', (e) => addBookToLibrary(e));
function addBookToLibrary(e) {
    e.preventDefault();
    if (titleInput.value === '' || authorInput === '' || pagesInput.value === '') {
        console.log(myLibrary);
        return;
    }
    let book = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
    myLibrary.push(book);
    displayBooks();
    resetForm();
}

function resetForm() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readInput.checked = false;
    modal.classList.add('hidden');
}

function displayBooks() {
    books.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        let newBook = document.createElement('div');
        let title = document.createElement('p');
        let author = document.createElement('p');
        let pages = document.createElement('p');
        let read = document.createElement('p');
        
        title.textContent = myLibrary[i].title;
        author.textContent = myLibrary[i].author;
        pages.textContent = myLibrary[i].pages;
        read.textContent = myLibrary[i].read;
        
        newBook.appendChild(title);
        newBook.appendChild(author);
        newBook.appendChild(pages);
        newBook.appendChild(read);
    
        newBook.className = `book ${i}`;
        
        books.appendChild(newBook);
    }

}


const books = document.querySelector('.books');

let myBook = new Book("Holes", "Louis Sachar", 272, true);
myLibrary.push(myBook);
