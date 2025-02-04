import {registerNewUser} from "../registerNewUserController.js";
import {fetchFavoriteBooks, removeFromFavorite, returnBook, showLoanedBooks} from "./viewUserInfoController.js";
import {model} from "../model.js";
import {addToFavorite} from "../BookPageController.js";

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
        <div class="book-info-layout">
        <div id="bookLoanedByUser"></div>
        <div id="favoriteBooks"></div>
        </div>
    `;
    document.getElementById('changePersonalInformation').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        await registerNewUser(username, password);
    });
    await showLoanedBooks();
    await fetchFavoriteBooks();
}

export function renderFavoriteBooks(favBooks) {
    const contentDiv = document.getElementById('favoriteBooks');
    if (!favBooks || favBooks.length === 0) {
        contentDiv.innerHTML = `<p>No favorite books yet</p>`;
    }
    contentDiv.innerHTML = `
    <h3>Favorite books</h3>
     <div class="favorite-books-grid"></div>
    `;
    const gridContainer = contentDiv.querySelector('.favorite-books-grid');
    favBooks.forEach((book) => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'favorite-book';
        console.log(model.app.favorite);
        const isFavorite = model.app.favorite.includes(book.isbn);
        const bookmarkIcon = isFavorite ? "/images/bookmark-check-fill.svg" : "/images/bookmark-fill.svg";
        bookDiv.innerHTML = `
            <img src="${book.coverImageUrl || 'images/book.svg'}" alt="${book.title}">
            <img class="bookmark" src="${bookmarkIcon}" alt="bookmark">
            <h4>${book.title}</h4>
        `;
        gridContainer.appendChild(bookDiv);
        
        console.log(isFavorite);
        const bookmarkButton = bookDiv.querySelector(".bookmark");
        bookmarkButton.addEventListener('click', async (event) => {
            event.stopPropagation();
            if (!model.app.isLoggedIn) {
                alert("Please log in to manage favorites.");
                return;
            }

            if (isFavorite) {
                await removeFromFavorite(book);
                model.app.favorite = model.app.favorite.filter(isbn => isbn !== book.isbn);
                bookmarkButton.src = "/images/bookmark-fill.svg";
            } else {
                await addToFavorite(book);
                model.app.favorite.push(book.isbn);
                bookmarkButton.src = "/images/bookmark-check-fill.svg";
            }
        });
    });
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

        const loanDate = new Date(book.loanDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        bookDiv.innerHTML = `
            <img src="${book.coverImageUrl || 'images/book.svg'}" alt="${book.title}">
            <h4>${book.title}</h4>
            <p class="loan-date">Loaned on: ${loanDate}</p>
            <div class="button-container">
                <button type="button" class="returnButton" data-isbn="${book.isbn}">Return Book</button>
            </div>
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