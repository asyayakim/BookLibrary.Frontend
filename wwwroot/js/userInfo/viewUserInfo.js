import {registerNewUser} from "../registerNewUserController.js";
import {returnBook, showLoanedBooks} from "./viewUserInfoController.js";

export async function viewUserInfo() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
       <h2>Change user info</h2>
        <form id="changePersonalInformation">
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
        <h3>Loaned Books</h3>
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
    const contentDiv = document.getElementById('content1');
    if (!loanedBooks || loanedBooks.length === 0) {
        contentDiv.innerHTML = '<p>No loaned books found.</p>';
        return;
    }
    console.log(loanedBooks);
    contentDiv.innerHTML = '';
    loanedBooks.forEach((book) => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'selected-book';
        bookDiv.innerHTML = `
     <div class="book">
     <img src="${book.coverImageUrl || 'images/book.svg'}" alt="${book.title}" style="width:100%; height:auto; background-color: #00b8a9 border-radius:5px; margin-bottom:10px;">
            <h3>${book.title}</h3>
            <p><strong>ISBN:</strong> ${book.isbn}</p>
            <p><strong>Loan Date:</strong> ${book.loanDate}</p>
            <div>
                  <button type="button" class="returnButton" data-isbn="${book.isbn}" >Return Book</button>
            </div>
        </div>
          `;
        contentDiv.appendChild(bookDiv);
    });
    const returnButtons = document.querySelectorAll('.returnButton');
    returnButtons.forEach((button) => {
        button.addEventListener('click', async () => {
            const isbn = button.getAttribute('data-isbn');
            console.log('Returning book with ISBN:', isbn);
            await returnBook(isbn);
        });
    });
}
