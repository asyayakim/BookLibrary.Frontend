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

    // let currentBatch = 0;
// export function renderBooks(books) {
//     const batchSize = 10;
//     contentDiv.innerHTML = '';
//     contentDiv.className = 'books-list'
//     manageLoadMoreButton();
//
//     function toggleLoadMoreButton(currentBatch, books) {
//         const loadMoreButton = document.getElementById("loadMoreBooks");
//         if (loadMoreButton) { 
//             if (currentBatch >= books.length) {
//                 loadMoreButton.style.display = 'none';
//             } else {
//                 loadMoreButton.style.display = 'block';
//             }
//         }
//     }
//     function manageLoadMoreButton() {
//         const mainContainer = document.getElementById('mainContainer');
//         const existingButtons = document.querySelectorAll('#loadMoreBooks');
//         existingButtons.forEach(button => button.remove()); // Remove all existing buttons
//
//         if (model.app.currentPage === 'homeLibrary') {
//             console.log('Creating Load More button');
//             const newButton = document.createElement('button');
//             newButton.id = 'loadMoreBooks';
//             newButton.className = 'load-more';
//             newButton.textContent = 'Load More Books';
//             newButton.addEventListener('click', loadBooks);
//             mainContainer.appendChild(newButton);
//         } else {
//             console.log('Not on homeLibrary, no button added.');
//         }
//     }
//
//  function loadBooks() {
//
//         console.log(currentBatch, batchSize, books);
//         const booksToDisplay = books.slice(currentBatch, currentBatch + batchSize);
//         booksToDisplay.forEach(book => {
//             const bookDiv = document.createElement('div');
//             bookDiv.className = 'book';
//             let truncatedTitle = book.title.length > 20 ? book.title.substring(0, 20) + '...' : book.title;
//             let truncatedAuthor = book.author.length > 15 ? book.title.substring(0, 15) + '...' : book.author;
//             bookDiv.innerHTML = `
//         <img src="${book.coverImageUrl || 'images/book.svg'}" alt="${book.title}" style="width:100%; height:auto; border-radius:5px; margin-bottom:10px;">
//              <img class="bookmark" src="/images/bookmark-fill.svg" alt="bookmark">
//             <div class="book-info">
//                 <h3 title="${book.title}">${truncatedTitle}</h3>
//                 <p><strong>Author:</strong> ${truncatedAuthor}</p>
//                ${
//                 model.app.userRole === 'admin'
//                     ? `<button class="deleteButton" data-id="${book.id}" data-isbn="${book.id}">Delete</button>`
//                     : ''
//             }
//             </div>         
//     `;
//
//             bookDiv.addEventListener('click', () => selectBookPage(book.id));
//             const bookmarkButton = bookDiv.querySelector(".bookmark");
//             bookmarkButton.addEventListener('click', (event) => {
//                 event.stopPropagation();
//                 if (model.app.isLoggedIn) {
//                     addToFavorite(book);
//                 } else {
//                     alert('Please log in to add to favorites.');
//                 }
//             });
//             contentDiv.appendChild(bookDiv);
//         });
//         currentBatch += batchSize;
//         toggleLoadMoreButton(currentBatch, books);
//         attachDeleteEventHandlers();
//
//
//         const DeleteButtons = document.querySelectorAll('.deleteButton');
//         DeleteButtons.forEach((button) => {
//             button.addEventListener('click', async () => {
//                 const id = button.getAttribute('data-isbn');
//                 await deleteBook(id);
//             });
//         });
//     }
//   
//     manageLoadMoreButton();
//     loadBooks();
// }

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
