import {model} from "./model.js";
import {updateView} from "./main.js";
import {addToFavorite} from "./BookPageController.js";
import {returnBook} from "./userInfo/viewUserInfoController.js";
import {renderAdminBooks} from "./admin.js/adminDashboard.js";
import {fetchSearchedBooks} from "./searchBooks/searchingBookController.js";
import {renderBooksForSearch} from "./searchBooks/searchingBookView.js";
import {renderBooks} from "./viewLibraryPage/viewLoadPageView.js";



const API_URL = 'http://localhost:5294/api/Book';
const contentDiv = document.getElementById('content');



export async function fetchBooks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
        if (model.app.userRole === 'admin') {
            renderAdminBooks(books);
        }
        else if (model.app.currentPage === 'searchBook') {
            await renderBooksForSearch(books);
        } else {
            renderBooks(books);
        }

    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

export function selectBookPage(bookId) {
    model.app.currentBookId = bookId;
    model.app.currentPage = "selectedBookPage";
    updateView();
}

async function deleteBook(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
        if (response.ok) {
            fetchBooks();
        } else {
            console.error('Failed to delete book');
        }
    } catch (error) {
        console.error('Error deleting book:', error);
    }
}

window.deleteBook = deleteBook;
