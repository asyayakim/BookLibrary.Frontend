import {model} from "./model.js";
import {updateView} from "./main.js";
import {manageLoadMoreButton, renderAdminBooks} from "./admin.js/adminDashboard.js";
import {renderBooksForSearch} from "./searchBooks/searchingBookView.js";
import {renderBooks} from "./viewLibraryPage/viewLoadPageView.js";



const API_URL = 'http://localhost:5294/api/Book';
export async function fetchBooks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
        if (model.app.userRole === 'admin') {
            if (model.app.currentPage === 'searchBook')
            {
                renderBooksForSearch(books);
            }
            else {
                renderAdminBooks(books);
                manageLoadMoreButton(books);
            }
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
    if (!bookId) {
        console.error("❌ Error: No book ID provided to selectBookPage");
        return;
    }
    model.app.currentBookId = bookId;
    model.app.currentPage = "selectedBookPage";
    updateView();
}

