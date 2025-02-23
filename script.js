function book(name, author, pages, readOrNot){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.readOrNot = readOrNot;
}

function addBookToLibrary(){

}

const myLibrary = [];

const book1 = new book("The Great Gatsby", "F. Scott Fitzgerald", 120, false);
const book2 = new book("To kill a mockingbird", "Harper Lee", 180, true);
myLibrary.push(book1);
myLibrary.push(book2);

let bookList = document.querySelector(".books");

function createCard(obj) {
    const name = obj.name;
    const author = obj.author;
    const pages = obj.pages;
    let readOrNot;
    if (obj.readOrNot) {
        readOrNot = 'Read';
    } else {
        readOrNot = 'Not Read';
    }

    let book = document.createElement('div');
    book.setAttribute('class', 'card');
    book.innerHTML = `<p class="bookName">${name}</p>
                    <p class="author">${author}</p>
                    <p class="pages">${pages + ' pages'}</p>
                    <div class="buttons">
                        <button class="read">${readOrNot}</button>
                        <button class="delete"><img src="./assets/trashbin.png"></button>
                    </div>
    
    `
    bookList.appendChild(book);

}

function refreshList() {
    myLibrary.forEach(createCard)

}


const modal = document.querySelector("[data-modal]")
const addBookButton = document.querySelector('.addbook');
addBookButton.addEventListener('click', () => {
    modal.showModal();
})

refreshList();