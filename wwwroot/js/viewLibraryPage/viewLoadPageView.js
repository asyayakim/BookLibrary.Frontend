import {model} from "../model.js";
import {fetchBooks, selectBookPage} from "../viewLibraryPage.js";
import {addToFavorite} from "../BookPageController.js";
import {attachDeleteEventHandlers} from "./viewLibraryPageController.js";
import {fetchAndDisplayEvents} from "./viewEventsController.js";
import {showPopularBooks} from "./viewPopularBooksController.js";
import {createBookmarks} from "../userInfo/viewUserInfo.js";


export function drawHomePage(){
        document.getElementById('content').innerHTML = `
    <div class="layout-admin-page">
    <div class="background-for-navigation">
        <img src="/images/crop-woman-reading-cafe.jpg" alt="Background Image" class="background-image">
        <div class="container">
        <h3>Events in the city</h3>
        </div>
            </div>
       <div class="events-container">
                <div class="events" id="events">Noe bla bla</div>
            </div>
       <div class="popular-books-container">
       <h3 class="white-title">Popular Books Now</h3>
                <div class="popular-books" id="popularBooks">Noe bla bla</div>
            </div> 
        <div id="viewBooks" class="viewBooks"></div>
          <div id="mainContainer" class="main-container">
            <button id="loadMoreBooks" class="load-more" style="display:none;">Load More Books</button>
            </div>
        </div>
        `;
        fetchBooks();
    fetchAndDisplayEvents();
    showPopularBooks();
        
    }
let currentBatch = 0;
let batchSize = 9;

export function renderBooks(books) {
    const contentDiv = document.getElementById('viewBooks'); // Correct container
    contentDiv.innerHTML = '';
    contentDiv.className = 'books-list-view';
    
    function loadBooks() {
        const booksToDisplay = books.slice(currentBatch, currentBatch + batchSize);

        booksToDisplay.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.className = 'book';
            let truncatedTitle = book.title.length > 20 ? book.title.substring(0, 20) + '...' : book.title;
            let truncatedAuthor = book.author.length > 15 ? book.author.substring(0, 15) + '...' : book.author;
            const isFavorite = model.app.favorite && model.app.favorite.includes(book.isbn);
            const bookmarkIcon = isFavorite ? "/images/bookmark-check-fill.svg" : "/images/bookmark-fill.svg";
            bookDiv.innerHTML = `
                <img src="${book.coverImageUrl || 'images/book.svg'}" alt="${book.title}">
                <img class="bookmark" src=" ${bookmarkIcon}" alt="bookmark">
                <div class="book-info">
                    <h3 title="${book.title}">${truncatedTitle}</h3>
                    <p><strong>Author:</strong> ${truncatedAuthor}</p>
    
                </div>
            `;
            createBookmarks(isFavorite, book, bookDiv);

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
        toggleLoadMoreButton(books);
        attachDeleteEventHandlers();
    }

    function toggleLoadMoreButton(books) {
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

export function manageLoadMoreButton(loadBooks) {
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
