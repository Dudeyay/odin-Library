    let onDisplay = new Map();
    let bookCount = 0;

    function changeRead(obj, id) {
        if (obj.id === id) {
            obj.readOrNot = !obj.readOrNot;
        }
    }

    function book(name, author, pages, readOrNot){
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.readOrNot = readOrNot;
        bookCount+=1;
        this.id = bookCount;
    }

    function addBookToLibrary(name, author, pages, readOrNot){
        const bookToAdd = new book(name, author, pages, readOrNot);
        myLibrary.push(bookToAdd);
        onDisplay.set(bookToAdd, false);
        refreshList();
    }

    function printBook(obj) {
        console.log(obj.name);
        console.log(obj.author);
        console.log(obj.pages);
        console.log(obj.readOrNot);
    }

    

    const myLibrary = [];

    const book1 = new book("The Great Gatsby", "F. Scott Fitzgerald", 120, false);
    const book2 = new book("To kill a mockingbird", "Harper Lee", 180, true);
    onDisplay.set(book1, false);
    onDisplay.set(book2, false);
    myLibrary.push(book1);
    myLibrary.push(book2);

    let bookList = document.querySelector(".books");

    function changeStatus(element, id) {
        if (element.innerHTML === 'Read') {
            element.innerHTML = 'Not Read';
        } else {
            element.innerHTML = 'Read';  
        }

        myLibrary.forEach((obj) => {
            changeRead(obj, id);
        });

        
    }


    function deleteBook(id) {
        let deletedBook;
        for (let i=0; i<myLibrary.length; i++) {
            if (myLibrary[i].id === id) {
                deletedBook = myLibrary[i];
                myLibrary.splice(i,1);
                break;
            }
        }
        onDisplay.delete(deletedBook);
        const card = document.getElementById(`${id}`);
        card.parentNode.removeChild(card);
    }

    function createCard(obj) {
        if (!onDisplay.get(obj)) {
            const name = obj.name;
            const author = obj.author;
            const pages = obj.pages;
            const id = obj.id;
            let readOrNot;
            if (obj.readOrNot) {
                readOrNot = 'Read';
            } else {
                readOrNot = 'Not Read';
            }
            
            let book = document.createElement('div');
            book.setAttribute('class', 'card');
            book.setAttribute('id', id);
            
            book.innerHTML = `<p class="bookName" style="overflow: hidden; text-overflow: ellipsis;">${name}</p>
                            <p class="author" style="overflow: hidden; text-overflow: ellipsis;">${author}</p>
                            <p class="pages" style="overflow: hidden; text-overflow: ellipsis;">${pages + ' pages'}</p>
                            <div class="buttons">
                                <button class="read" onclick='changeStatus(this, ${id})'>${readOrNot}</button>
                                <button class="delete" onclick='deleteBook(${id})'><img src="./assets/trashbin.png"></button>
                            </div>
            
            `
            bookList.appendChild(book);
            onDisplay.set(obj, true);
        }

    }

    function refreshList() {
        myLibrary.forEach(createCard);

    }


    const modal = document.querySelector("[data-modal]")
    const addBookButton = document.querySelector('.addbook');
    addBookButton.addEventListener('click', () => {
        modal.showModal();
    })

    const form = document.querySelector('.form');
    form.addEventListener('submit', function(event) {
        if (event.submitter.textContent === "Submit") {
            event.preventDefault();
            const name = document.querySelector('#title').value;
            const author = document.querySelector('#author').value;
            const pages = document.querySelector('#page').value;
            const readOrNot = document.querySelector('#read').checked;
            addBookToLibrary(name, author, pages, readOrNot);
            modal.close();
        }
    })


    const closeButton = document.querySelector('[data-close-modal]');


    closeButton.addEventListener('click', () => {
        // Close the dialog
        modal.close();
      });

    refreshList();