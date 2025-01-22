import {fetchBooks} from "../viewLibraryPage.js";
import {model} from "../model.js";
import {addToFavorite} from "../BookPageController.js";
import {updateView} from "../main.js";


export function renderAdminDashboard() {
    document.getElementById('content').innerHTML = `
    <div class="layout-admin-page">
    <div class="background-for-navigation">
       <h2>Welcome, Admin!</h2>
        <div class="container">
            <button class="viewLoanedBooksUsers">View all loaned books and users</button>
            <button class="addBookPage">Add book</button>
        </div>
        </div>
        <div id="viewBooks" class="viewBooks"></div>
        </div>
        `;
    const addBookButton = document.querySelector('.addBookPage');
    addBookButton.addEventListener('click', (event) => {
        event.stopPropagation();
        model.app.currentPage = 'addBook';
        updateView();
    });
    
    const viewLoanedBooksButton = document.querySelector('.viewLoanedBooksUsers');
    viewLoanedBooksButton.addEventListener('click', () => {
        alert('Displaying all loaned books and users!');
        model.app.currentPage = 'adminViewUsers&Books';
        updateView();
    });
    fetchBooks();
}

export function renderAdminBooks(books) {
    const contentDiv = document.getElementById('viewBooks');


    contentDiv.className = 'books-list-Admin'
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book-admin-page';
        let truncatedTitle = book.title.length > 20 ? book.title.substring(0, 20) + '...' : book.title;
        let truncatedAuthor = book.author.length > 15 ? book.title.substring(0, 15) + '...' : book.author;
        bookDiv.innerHTML = `
        <img src="${book.coverImageUrl}" alt="${book.title}">
            <div class="book-info">
                <h3 title="${book.title}">${truncatedTitle}</h3>
                <p><strong>Author:</strong> ${truncatedAuthor}</p>
                <button class="deleteButton" data-id="${book.id}">Delete</button>
                <button class="editButton" data-id="${book.id}">Edit</button>
            </div>
    `;
        contentDiv.appendChild(bookDiv);
    });
}