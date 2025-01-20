import {renderBooks} from "../viewLibraryPage.js";
import {model} from "../model.js";

export async function showLoanedBooks() {
    const userId = model.app.loggedInUser;
    console.log(userId);
    const API_URL = `http://localhost:5294/api/books/loaned?userId=${userId}`;
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const loanedBooks = await response.json();
        console.log(loanedBooks);

        renderLoanedBooks(loanedBooks);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
    
}


function renderLoanedBooks(loanedBooks) {
    const contentDiv = document.getElementById('content1');
    if (!loanedBooks || loanedBooks.length === 0) {
        contentDiv.innerHTML = '<p>No loaned books found.</p>';
        return;
    }
        contentDiv.innerHTML = '';
        contentDiv.className = 'selected-book-layout';
    loanedBooks.forEach((book) => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'selected-book';
        bookDiv.innerHTML = `
     <div class="book">
            <h3>${book.title}</h3>
            <p><strong>ISBN:</strong> ${book.isbn}</p>
            <p><strong>Loan Date:</strong> ${book.loanDate}</p>
        </div>
          `;
        contentDiv.appendChild(bookDiv);
    });
}