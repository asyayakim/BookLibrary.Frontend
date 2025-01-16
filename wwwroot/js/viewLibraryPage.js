import {model} from "./model.js";
import {updateView} from "./main.js";

const API_URL = 'http://localhost:5294/api/Book';
const contentDiv = document.getElementById('content');
const viewLibraryPageBtn = document.getElementById('viewLibraryPage');

export async function fetchBooks() {
    try { 
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
        renderBooks(books);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

function renderBooks(books) {
    contentDiv.innerHTML = '';
    contentDiv.className = 'books-list'
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        let truncatedTitle = book.title.length > 20 ? book.title.substring(0, 20) + '...' : book.title;
        bookDiv.innerHTML = `

        <img src="${book.coverImageUrl}" alt="${book.title}" style="width:100%; height:auto; border-radius:5px; margin-bottom:10px;">
            <div class="book-info">
                <h3 title="${book.title}">${truncatedTitle}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <button onclick="deleteBook(${book.id})" style="background-color: #e75c5c; border: none; padding: 0.5rem 1rem; color: white; cursor: pointer; border-radius: 5px;">Delete</button>
            </div>
    `;
        contentDiv.appendChild(bookDiv);
        bookDiv.addEventListener('click', () => selectBookPage(book.id));
    });
}
function selectBookPage(bookId) {
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
