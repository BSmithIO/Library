let myLibrary = [];
const addNewBookBtn = document.querySelector(".newbook");
const bookTitle = document.querySelector(".title");
const bookAuthor = document.querySelector(".author");
const bookPages = document.querySelector(".pages");
const bookRead = document.querySelector(".read");
const submitBook = document.querySelector(".submitBook");
const formPopup = document.querySelector(".form-popup");
const closeBtn = document.querySelector(".close");

restore();

submitBook.addEventListener("click", addBookToLibrary);

addNewBookBtn.addEventListener("click", openForm);

closeBtn.addEventListener("click", closeForm);

function Book (title, author, pages, read) {
    this.title = bookTitle.value;
    this.author = bookAuthor.value;
    this.pages = bookPages.value + " pgs";
    this.read = bookRead.checked
}

function openForm() {
    formPopup.style.display = "block";
    document.querySelector(".title").focus();

}

function closeForm() {
    formPopup.style.display = "none";
}

function addBookToLibrary() {
    if (bookTitle.value == "" || bookAuthor.value == "" || bookPages.value == "") {
        alert("Please, fill in all fields");
    } else {
        myLibrary.push(new Book());
        saveBooks();    
        displayBooks();
        clearForm();
        closeForm();
    }
}


function clearForm() {
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
    bookRead.checked = false;
}

function createBook(book) {
    const library = document.querySelector(".library");
    const bookDiv = document.createElement("div");
    const title = document.createElement("h2");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const readBtn = document.createElement("p");
    const deleteBtn = document.createElement("button");

    bookDiv.classList.add("book");
    readBtn.classList.add("readYet");
    deleteBtn.classList.add("deleteBook");
    bookDiv.setAttribute('id', myLibrary.indexOf(book));

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;


    if (book.read === false) {
        readBtn.textContent = "Not Read";
        readBtn.style.backgroundColor = "red";
    } else {
        readBtn.textContent = "Read";
        readBtn.style.backgroundColor = "green";
    }

    deleteBtn.textContent = "Delete";

    readBtn.addEventListener("click", () => {
        book.read = !book.read;
        saveBooks();
        displayBooks();
    });

    deleteBtn.addEventListener("click", () => {
        myLibrary.splice(myLibrary.indexOf(book), 1);
        saveBooks();
        displayBooks();
    });

    bookDiv.append(title,author,pages,readBtn,deleteBtn);
    library.appendChild(bookDiv);
}

function displayBooks() {
    const books = document.querySelectorAll('.book');
    const display = document.querySelector('.library');
    books.forEach(book => display.removeChild(book));

    for (let i=0; i<myLibrary.length; i++){
        createBook(myLibrary[i]);
    }   
}
function saveBooks() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

function restore() {
    if(!localStorage.myLibrary) {
        displayBooks();
    }else {
        let objects = localStorage.getItem('myLibrary');
        objects = JSON.parse(objects);
        myLibrary = objects;
        displayBooks();
    }
}