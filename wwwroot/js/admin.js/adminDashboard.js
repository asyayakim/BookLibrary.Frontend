import {fetchBooks, selectBookPage} from "../viewLibraryPage.js";
import {model} from "../model.js";
import {addToFavorite} from "../BookPageController.js";
import {updateView} from "../main.js";




export function renderAdminDashboard() {
    document.getElementById('content').innerHTML = `
    <div class="layout-admin-page">
    <div class="background-for-navigation-admin">
       <h2>Welcome, Admin!</h2>
        <div class="container">
            <button class="viewLoanedBooksUsers">View all loaned books and users</button>
            <button class="addBookPage">Add book</button>
            <button class="viewLibraryPage">View Library</button>
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
    const viewLibraryButton = document.querySelector('.viewLibraryPage');
    viewLibraryButton.addEventListener('click', (event) => {
        event.stopPropagation();
        model.app.currentPage = 'adminDashboard';
        updateView();
    });
    const viewLoanedBooksButton = document.querySelector('.viewLoanedBooksUsers');
    viewLoanedBooksButton.addEventListener('click', () => {
        model.app.currentPage = 'adminViewUsers&Books';
        updateView();
    });
    fetchBooks();
}
let currentBatch = 0;
let batchSize = 9;
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
                
                <button class="editButton" data-id="${book.id}">Edit</button>
            </div>
    `;
        contentDiv.appendChild(bookDiv);
        const DeleteButtons = document.querySelectorAll('.deleteButton');
        DeleteButtons.forEach((button) => {
            button.addEventListener('click', async () => {
                const id = button.getAttribute('data-id');
                await deleteBook(id);
            });
        });
        const editButton = document.querySelectorAll('.editButton');
        editButton.forEach((button) => {
            button.addEventListener('click', async () => {
                const id = button.getAttribute('data-id');
                await selectBookPage(id);
            });
        }); 
    });
}