import {model} from "../model.js";
import {fetchBooks, selectBookPage} from "../viewLibraryPage.js";
import {addToFavorite} from "../BookPageController.js";
import {attachDeleteEventHandlers} from "./viewLibraryPageController.js";


export function drawHomePage(){
        document.getElementById('content').innerHTML = `
    <div class="layout-admin-page">
    <div class="background-for-navigation">
        <div class="container">
        <h3>Events in the city</h3>
            
        </div>
        </div>
        
        <div id="viewBooks" class="viewBooks"></div>
          <div id="mainContainer" class="main-container">
            <button id="loadMoreBooks" class="load-more" style="display:none;">Load More Books</button>
            </div>
        </div>
        `;
        fetchBooks();
        
    }
let currentBatch = 0;
let batchSize = 10;

export function renderBooks(books) {
    const contentDiv = document.getElementById('viewBooks'); // Correct container
    contentDiv.innerHTML = '';
    contentDiv.className = 'books-list';


    function loadBooks() {
        console.log(currentBatch, batchSize, books);
        const booksToDisplay = books.slice(currentBatch, currentBatch + batchSize);

        booksToDisplay.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.className = 'book';
            let truncatedTitle = book.title.length > 20 ? book.title.substring(0, 20) + '...' : book.title;
            let truncatedAuthor = book.author.length > 15 ? book.author.substring(0, 15) + '...' : book.author;

            bookDiv.innerHTML = `
                <img src="${book.coverImageUrl || 'images/book.svg'}" alt="${book.title}" style="width:100%; height:auto; border-radius:5px; margin-bottom:10px;">
                <img class="bookmark" src="/images/bookmark-fill.svg" alt="bookmark">
                <div class="book-info">
                    <h3 title="${book.title}">${truncatedTitle}</h3>
                    <p><strong>Author:</strong> ${truncatedAuthor}</p>
                   ${
                model.app.userRole === 'admin'
                    ? `<button class="deleteButton" data-id="${book.id}" data-isbn="${book.id}">Delete</button>`
                    : ''
            }
                </div>
            `;
            const DeleteButtons = document.querySelectorAll('.deleteButton');
            DeleteButtons.forEach((button) => {
                button.addEventListener('click', async () => {
                    const id = button.getAttribute('data-isbn');
                    await deleteBook(id);
                });
            });

            bookDiv.addEventListener('click', () => selectBookPage(book.id));

            const bookmarkButton = bookDiv.querySelector(".bookmark");
            bookmarkButton.addEventListener('click', (event) => {
                event.stopPropagation();
                if (model.app.isLoggedIn) {
                    addToFavorite(book);
                } else {
                    alert('Please log in to add to favorites.');
                }
            });

            contentDiv.appendChild(bookDiv);
        });

        currentBatch += batchSize;
        toggleLoadMoreButton();
        attachDeleteEventHandlers();
    }

    function toggleLoadMoreButton() {
        const loadMoreButton = document.getElementById("loadMoreBooks");
        if (loadMoreButton) {
            if (currentBatch >= books.length) {
                loadMoreButton.style.display = 'none';
            } else {
                loadMoreButton.style.display = 'block';
            }
        }
    }
 

    manageLoadMoreButton(loadBooks);
    loadBooks();
}

function manageLoadMoreButton(loadBooks) {
    const mainContainer = document.getElementById('mainContainer');
    let loadMoreButton = document.getElementById('loadMoreBooks');

    if (!loadMoreButton) {
        loadMoreButton = document.createElement('button');
        loadMoreButton.id = 'loadMoreBooks';
        loadMoreButton.className = 'load-more';
        loadMoreButton.textContent = 'Load More Books';
        mainContainer.appendChild(loadMoreButton);
    }

    loadMoreButton.style.display = model.app.currentPage === 'homeLibrary' ? 'block' : 'none';

    loadMoreButton.addEventListener('click', loadBooks);
}
