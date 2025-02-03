import {model} from "../model.js";
import {renderFavoriteBooks, renderLoanedBooks} from "./viewUserInfo.js";
import {updateView} from "../main.js";

export async function showLoanedBooks() {
    const userId = model.app.loggedInUser;
    const API_URL = `http://localhost:5294/api/books/loaned?userId=${userId}`;
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            if (response.status === 404) {
                console.warn('No loaned books found for this user.');
                renderLoanedBooks([]);
                return;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const loanedBooks = await response.json();
        console.log(loanedBooks);

        renderLoanedBooks(loanedBooks);
    } catch (error) {
        console.error('Error fetching books:', error);
    }

}

export async function returnBook(book) {
    try {
        const userId = model.app.loggedInUser;
        const API_URL = `http://localhost:5294/api/books/deleteBook?userId=${userId}&isbn=${book}`;
        const response = await fetch(API_URL, {method: 'DELETE'});
        if (response.ok) {
            alert('Book returned successfully.');
            model.app.currentPage = 'userInfo';
            updateView();
        } else {
            console.error('Failed to return book');
        }
    } catch (error) {
        console.error('Error deleting book:', error);
    }

}

export async function fetchFavoriteBooks() {
    const userId = model.app.loggedInUser;
    const API_URL = `http://localhost:5294/api/books/showFavorite?userId=${userId}`;
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            if (response.status === 404) {
                console.warn('No loaned books found for this user.');
                renderLoanedBooks([]);
                return;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const favBooks = await response.json();
        console.log(favBooks);

        renderFavoriteBooks(favBooks);
    } catch (error) {
        console.error('Error fetching books:', error);
    }

}
