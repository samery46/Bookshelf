const UNCOMPLETED_LIST_BOOK_ID = 'incompletedBookshelfList';
const COMPLETED_LIST_BOOK_ID = 'completedBookshelfList';
const ID_BOOK = 'bookId';

function makeBook(title, author, year, isCompleted) {

    const bookTitle = document.createElement('h3');
    bookTitle.classList.add('inputed-title');
    bookTitle.innerHTML = title;

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('inputed-author');
    bookAuthor.innerText = author;
    
    const bookYear = document.createElement('p');
    bookYear.classList.add('inputed-year');
    bookYear.innerText = year;

    const actionContainer = document.createElement('div');
    actionContainer.classList.add('action');

    const container = document.createElement('article');
    container.classList.add('book_item');
    container.append(bookTitle, bookAuthor, bookYear);
    container.append(actionContainer);

    if (isCompleted) {
        actionContainer.append(
            createUncompletedButton(), 
            createDeleteButton()
        );
    } else {
        actionContainer.append(
            createCompletedButton(), 
            createDeleteButton()
        );
    }
    
    return container;
}

function createUncompletedButton() {
    return createButton('blue', 'Belum selesai dibaca', function(event) {
        undoBookFromCompleted(event.target.parentElement.parentElement);
    });
}

function createDeleteButton() {
    return createButton('red', 'Hapus', function(event) {
        removeBook(event.target.parentElement.parentElement);
    });
}


function createCompletedButton() {
    return createButton('green', 'Selesai dibaca', function(event) {
        addBookToCompleted(event.target.parentElement.parentElement);
    });
}

function createButton(buttonTypeClass, text, eventListener) {
    const button = document.createElement('button');
    button.classList.add(buttonTypeClass);
    button.innerText = text;
    button.addEventListener('click', function(event) {
        eventListener(event);
    });
    return button;
}

function addBook() {
    const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const completedBookList = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const bookTitleValue = document.getElementById('inputBookTitle').value;
    const bookAuthorValue = document.getElementById('inputBookAuthor').value;
    const bookYearValue = document.getElementById('inputBookYear').value;
    const bookIsCompletedValue = document.getElementById('inputBookIsCompleted');
    if (bookIsCompletedValue.checked === true ) {
        const book = makeBook(
            bookTitleValue,
            bookAuthorValue,
            bookYearValue,
            true,
        );

        const bookObject = composeBookObject(
            bookTitleValue,
            bookAuthorValue,
            bookYearValue,
            true,
        );

        book[ID_BOOK] = bookObject.id;
        books.push(bookObject);

        completedBookList.append(book);
        updateDataToStorage();

    } else {
        const book = makeBook(
            bookTitleValue,
            bookAuthorValue,
            bookYearValue,
            false,
        );

        const bookObject = composeBookObject(
            bookTitleValue,
            bookAuthorValue,
            bookYearValue,
            false,
        );

        book[ID_BOOK] = bookObject.id;
        books.push(bookObject);

        uncompletedBookList.append(book);
        updateDataToStorage();
        
    }

}


function addBookToCompleted(bookElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const bookTitleElement= bookElement.querySelector("#incompletedBookshelfList > .book_item > h3").innerText;
    const bookAuthorElement = bookElement.querySelector(".inputed-author").innerText;
    const bookYearElement = bookElement.querySelector(".inputed-year").innerText;

    const newBook = makeBook(
        bookTitleElement, 
        bookAuthorElement, 
        bookYearElement, 
        true
    );

    const book = findBook(bookElement[ID_BOOK]);
    book.isCompleted = true;
    
    newBook[ID_BOOK] = book.id;
    listCompleted.append(newBook);
    bookElement.remove();
    
    updateDataToStorage();
}

function undoBookFromCompleted(bookElement) {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

    const bookTitleElement = bookElement.querySelector("#completedBookshelfList > .book_item > h3").innerText;
    const bookAuthorElement = bookElement.querySelector(".inputed-author").innerText;
    const bookYearElement = bookElement.querySelector(".inputed-year").innerText;

    const newBook = makeBook(
        bookTitleElement, 
        bookAuthorElement, 
        bookYearElement, 
        false
    );

    const book = findBook(bookElement[ID_BOOK]);
    book.isCompleted = false;
    
    newBook[ID_BOOK] = book.id;
    listUncompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function removeBook(bookElement) {
    const bookPosition = findBookIndex(bookElement[ID_BOOK]);

    books.splice(bookPosition, 1);

    bookElement.remove();
    updateDataToStorage();
}

