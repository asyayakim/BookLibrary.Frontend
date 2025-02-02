import {registerNewUser} from "../registerNewUserController.js";
import {returnBook, showLoanedBooks} from "./viewUserInfoController.js";

export async function viewUserInfo() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
        <form id="changePersonalInformation">
       <h2>Change user info</h2>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <label for="password">Password*:</label>
            <input type="password" id="password" name="password" required>
            <label for="confirmPassword">Confirm Password*:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required>
            <div class = "registerButtons">
            <button type="submit">Confirm</button>
             </div>
        </form>
        <div id="bookLoanedByUser"></div>
    `;
    document.getElementById('changePersonalInformation').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        await registerNewUser(username, password);
    });
    await showLoanedBooks();
}

export function renderLoanedBooks(loanedBooks) {
    const contentDiv = document.getElementById('bookLoanedByUser');
    if (!loanedBooks || loanedBooks.length === 0) {
        contentDiv.innerHTML = '<p>No loaned books found.</p>';
        return;
    }
    contentDiv.innerHTML = `
        <h3>Loaned Books</h3>
        <div class="loaned-books-grid"></div>
    `;

    const gridContainer = contentDiv.querySelector('.loaned-books-grid');
    loanedBooks.forEach((book) => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'loaned-book';

        // Format the loan date
        const loanDate = new Date(book.loanDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        bookDiv.innerHTML = `
            <img src="${book.coverImageUrl || 'images/book.svg'}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p class="loan-date">Loaned on: ${loanDate}</p>
            <button type="button" class="returnButton" data-isbn="${book.isbn}">Return Book</button>
        `;
        gridContainer.appendChild(bookDiv);
    });

    const returnButtons = document.querySelectorAll('.returnButton');
    returnButtons.forEach((button) => {
        button.addEventListener('click', async () => {
            const isbn = button.getAttribute('data-isbn');
            await returnBook(isbn);
        });
    });
}