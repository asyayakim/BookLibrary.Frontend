import {model} from "../model.js";
import {addToFavorite} from "../BookPageController.js";
import {selectBookPage} from "../viewLibraryPage.js";

// export function toggleLoadMoreButton(currentBatch, books) {
//     const contentDiv = document.getElementById('content');
//     let loadMoreButton = document.getElementById("loadMoreBooks");
//     if (!loadMoreButton) {
//         loadMoreButton = document.createElement('button');
//         loadMoreButton.id = 'loadMoreBooks';
//         loadMoreButton.className = 'load-more';
//         loadMoreButton.textContent = 'Load More Books';
//         loadMoreButton.addEventListener('click', loadBooks);
//         contentDiv.appendChild(loadMoreButton);
//     }
//
//     if (currentBatch >= books.length) {
//         loadMoreButton.style.display = 'none'; // Hide button if all books are loaded
//     } else {
//         loadMoreButton.style.display = 'block'; // Show button if more books can be loaded
//     }
// }
export function attachDeleteEventHandlers() {
    const deleteButtons = document.querySelectorAll('.deleteButton');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', async (event) => {
            event.stopPropagation(); // Prevent triggering book selection
            const id = button.getAttribute('data-isbn');
            await deleteBook(id);
            button.parentElement.parentElement.remove(); // Remove the bookDiv from the DOM
        });
    });
}
// export function loadBooks(currentBatch, batchSize, books) {
//     const contentDiv = document.getElementById('content');
//     console.log(currentBatch, batchSize, books);
//     const booksToDisplay = books.slice(currentBatch, currentBatch + batchSize);
//     booksToDisplay.forEach(book => {
//         const bookDiv = document.createElement('div');
//         bookDiv.className = 'book';
//         let truncatedTitle = book.title.length > 20 ? book.title.substring(0, 20) + '...' : book.title;
//         let truncatedAuthor = book.author.length > 15 ? book.title.substring(0, 15) + '...' : book.author;
//         bookDiv.innerHTML = `
//         <img src="${book.coverImageUrl || 'images/book.svg'}" alt="${book.title}" style="width:100%; height:auto; border-radius:5px; margin-bottom:10px;">
//              <img class="bookmark" src="/images/bookmark-fill.svg" alt="bookmark">
//             <div class="book-info">
//                 <h3 title="${book.title}">${truncatedTitle}</h3>
//                 <p><strong>Author:</strong> ${truncatedAuthor}</p>
//                ${
//             model.app.userRole === 'admin'
//                 ? `<button class="deleteButton" data-id="${book.id}" data-isbn="${book.id}">Delete</button>`
//                 : ''
//         }
//             </div>         
//     `;
//
//         bookDiv.addEventListener('click', () => selectBookPage(book.id));
//         const bookmarkButton = bookDiv.querySelector(".bookmark");
//         bookmarkButton.addEventListener('click', (event) => {
//             event.stopPropagation();
//             if (model.app.isLoggedIn) {
//                 addToFavorite(book);
//             } else {
//                 alert('Please log in to add to favorites.');
//             }
//         });
//         contentDiv.appendChild(bookDiv);
//     });
//     currentBatch += batchSize;
//     toggleLoadMoreButton(currentBatch, books);
//     attachDeleteEventHandlers();
//
//
//     const DeleteButtons = document.querySelectorAll('.deleteButton');
//     DeleteButtons.forEach((button) => {
//         button.addEventListener('click', async () => {
//             const id = button.getAttribute('data-isbn');
//             await deleteBook(id);
//         });
//     });
// }