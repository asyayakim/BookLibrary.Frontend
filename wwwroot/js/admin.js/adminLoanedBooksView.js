import {model} from "../model.js";
import Config from "../utils/config.js";
import {fetchAdminViewUsers} from "./adminLoanedBooksController.js";

export async function renderAdminViewUsers() {
    document.getElementById('content').innerHTML = `
    <div class="layout-users">
    <div class="background-for-navigation-admin">
       <h2>Manage users data</h2>
        <div class="container">
            <button class="sort">Sort users by</button>
        </div>
        </div>
        <div id="viewUsers" class="viewUsers"></div>
        </div>
        `;
    await fetchAdminViewUsers();
}
export function renderDbData(books) {
    const contentDiv = document.getElementById('viewUsers');
    contentDiv.className = 'books-list-Admin'
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book-admin-page';
        
        bookDiv.innerHTML = `
        <img src="${book.coverImageUrl}" alt="${book.title}">
            <div class="book-info">
                <p title="${book.title}">${book.title}</p>
                <p><strong>ISBN:</strong> ${book.isbn}</p>
                <p><strong>Loan Date:</strong>${new Date(book.loanDate).toLocaleDateString()}</p>
                <p><strong>UserId:</strong> ${book.userId}</p>
                <button data-id="${book.userId}">User info</button>
            </div>
    `;
        contentDiv.appendChild(bookDiv);
    });
}