import {model} from "../model.js";
import {addToFavorite} from "../BookPageController.js";
import {applyFilters} from "./searchingBookFiltr.js";
import {fetchBooks, selectBookPage} from "../viewLibraryPage.js";
import {manageLoadMoreButton} from "../viewLibraryPage/viewLoadPageView.js";


let currentBatch = 10;
let sortedBooks = [];
export let activeFilters = [];

export function showSearchingBooks() {

    document.getElementById('content').innerHTML = `
    <div class="search-layout">
    <div class="background-for-search">
       <h2>Search books by</h2>
        <div class="search">
            <div class="sort-by-year">
                    <div class="sort-header">Sort books by year <img src="images/caret-up.svg"></div>
                    <div class="sort-options year-options" style="display: none;">
                        <label>Year From: <input type="number" id="yearFrom" placeholder="e.g., 2000"></label>
                        <label>Year To: <input type="number" id="yearTo" placeholder="e.g., 2020"></label>
                        <button id="filterByYear">Filter</button>
                    </div>
                </div>
            <div class="sort-by-genre">
                    <div class="sort-header">Sort books by genre <img src="images/caret-up.svg"></div>
                    <div class="sort-options genre-options" style="display: none;">
                        <label>
                            <input type="checkbox" name="genre" value="fiction"> Fiction
                        </label>
                        <label>
                            <input type="checkbox" name="genre" value="drama"> Drama
                        </label>
                        <label>
                            <input type="checkbox" name="genre" value="fantasy"> Fantasy
                        </label>
                        <label>
                            <input type="checkbox" name="genre" value="mystery"> Mystery
                        </label>
                        <label>
                            <input type="checkbox" name="genre" value="poetry"> Poetry
                        </label>
                        <button id="filterByGenre">Filter</button>
                    </div>
                </div>
        </div>
              <div class="selected-filters">
              <h2>Selected Filters:</h2>
              <div id="filterTags"></div>
              </div>
        </div>
        <div id="viewSearch" class="viewBooks"></div>
        <div id="mainContainer" class="main-container">
            <button id="loadMoreBooks" class="load-more" style="display:none;">Load More Books</button>
            </div>
       

        </div>
        `;
    
    fetchBooks();
    let filterTagsDiv = document.getElementById('filterTags');
    filterTagsDiv.innerHTML = '';
    activeFilters.forEach(filter => {
        let tag = document.createElement('div');
        tag.className = 'filter-tag';
        let textSpan = document.createElement('span');
        textSpan.textContent = filter.label;
        let removeButton = document.createElement('button');
        removeButton.textContent = '✕'; 
        removeButton.className = 'remove-button';

        removeButton.addEventListener('click', () => {
            activeFilters = activeFilters.filter(f => f !== filter);
            filter.remove();
            applyFilters(activeFilters, sortedBooks);
        });

        tag.appendChild(textSpan);
        tag.appendChild(removeButton);
        filterTagsDiv.appendChild(tag);
    });


    model.app.currentPage = 'searchBook';
    model.app.searchMode = false;
    document.querySelector('.sort-by-year .sort-header').addEventListener('click', (e) => {
        let sortOptions = e.target.closest('.sort-by-year').querySelector('.sort-options');
        let img = e.target.closest('.sort-by-year').querySelector('img');
        if (sortOptions.style.display === 'none') {
            sortOptions.style.display = 'block';
            img.src = 'images/caret-down-fill.svg';
        } else {
            sortOptions.style.display = 'none';
            img.src = 'images/caret-up.svg';
        }
    });

    document.querySelector('.sort-by-genre .sort-header').addEventListener('click', (e) => {
        let sortOptions = e.target.closest('.sort-by-genre').querySelector('.sort-options');
        let img = e.target.closest('.sort-by-genre').querySelector('img');
        if (sortOptions.style.display === 'none') {
            sortOptions.style.display = 'block';
            img.src = 'images/caret-down-fill.svg';
        } else {
            sortOptions.style.display = 'none';
            img.src = 'images/caret-up.svg';
        }
    });

    document.getElementById('filterByYear').addEventListener('click', () => {
        const yearFrom = parseInt(document.getElementById('yearFrom').value, 10);
        const yearTo = parseInt(document.getElementById('yearTo').value, 10);
        const selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked'))
            .map(checkbox => checkbox.value.toLowerCase());

        const filteredBooks = sortedBooks.filter(book => {
            const year = parseInt(book.year, 10);
            const matchesYear = (!isNaN(yearFrom) ? year >= yearFrom : true) &&
                (!isNaN(yearTo) ? year <= yearTo : true);
            const matchesGenre = selectedGenres.length
                ? selectedGenres.some(genre => book.genre.toLowerCase().includes(genre))
                : true;

            return matchesYear && matchesGenre;
        });
        activeFilters = activeFilters.filter(filter => filter.type !== 'year');
        if (!isNaN(yearFrom) || !isNaN(yearTo)) {
            activeFilters.push({
                type: 'year',
                label: `Year: ${yearFrom || 'any'} - ${yearTo || 'any'}`,
                remove: () => {
                    document.getElementById('yearFrom').value = '';
                    document.getElementById('yearTo').value = '';
                }
            });
        }

        applyFilters(activeFilters, sortedBooks);
filterBooks();
        
        
    });

    document.getElementById('filterByGenre').addEventListener('click', () => {
        let selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked'))
            .map(checkbox => checkbox.value.toLowerCase());

        activeFilters = activeFilters.filter(filter => filter.type !== 'genre');
        selectedGenres.forEach(genre => {
            activeFilters.push({
                type: 'genre',
                label: `${genre}`,
                remove: () => {
                    document.querySelector(`input[name="genre"][value="${genre}"]`).checked = false;
                }
            });
        });

        applyFilters(activeFilters, sortedBooks);
        filterBooks();


        let yearFrom = parseInt(document.getElementById('yearFrom').value, 10);
        let yearTo = parseInt(document.getElementById('yearTo').value, 10);

        let filteredBooks = sortedBooks.filter(book => {
            let year = parseInt(book.year, 10);
            let matchesYear = (!isNaN(yearFrom) ? year >= yearFrom : true) &&
                (!isNaN(yearTo) ? year <= yearTo : true);
            let matchesGenre = selectedGenres.length
                ? selectedGenres.some(genre => book.genre.toLowerCase().includes(genre))
                : true;

            return matchesYear && matchesGenre;
        });
        currentBatch = 9;
        renderBooksForSearch(filteredBooks);
    });

}

export function renderBooksForSearch(filteredBooks) {
    const contentDiv = document.getElementById('viewSearch');
    contentDiv.innerHTML = '';
    contentDiv.className = 'books-list'
    sortedBooks = filteredBooks;
    const booksToDisplay = filteredBooks.slice(0, currentBatch);
    booksToDisplay.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        let truncatedTitle = book.title.length > 20 ? book.title.substring(0, 20) + '...' : book.title;
        let truncatedAuthor = book.author.length > 15 ? book.title.substring(0, 15) + '...' : book.author;
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
        //bookDiv.addEventListener('click', () => selectBookPage(book.id));
    


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
    const mainContainer = document.getElementById('mainContainer');
    let loadMoreButton = document.getElementById('loadMoreBooks');

    if (!loadMoreButton) {
        loadMoreButton = document.createElement('button');
        loadMoreButton.id = 'loadMoreBooks';
        loadMoreButton.className = 'load-more';
        loadMoreButton.textContent = 'Load More Books';
        mainContainer.appendChild(loadMoreButton);
    }

    if (filteredBooks.length > currentBatch) {
        loadMoreButton.style.display = 'block';
        loadMoreButton.onclick = () => {
            currentBatch += 10;
            renderBooksForSearch(filteredBooks);
        };
    } else {
        loadMoreButton.style.display = 'none';
    }
}

function filterBooks() {
    let yearFrom = parseInt(document.getElementById('yearFrom').value, 10);
    let yearTo = parseInt(document.getElementById('yearTo').value, 10);
    let selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked'))
        .map(checkbox => checkbox.value.toLowerCase());

    let filteredBooks = sortedBooks.filter(book => {
        let year = parseInt(book.year, 10);
        const matchesYear = (!isNaN(yearFrom) ? year >= yearFrom : true) &&
            (!isNaN(yearTo) ? year <= yearTo : true);
        const matchesGenre = selectedGenres.length === 0 || selectedGenres.some(genre =>
            book.genre && book.genre.toLowerCase().includes(genre)
        );

        return matchesYear && matchesGenre;
    });
    renderBooksForSearch(filteredBooks);
}
export function updateFilterTags(filters, sortedBooks) {
    let filterTagsDiv = document.getElementById('filterTags');
    filterTagsDiv.innerHTML = '';


    filters.forEach(filter => {
        let tag = document.createElement('div');
        tag.className = 'filter-tag';
        let textSpan = document.createElement('span');
        tag.textContent = filter.label;

        let removeButton = document.createElement('button');
        removeButton.className = 'remove-button';
        removeButton.textContent = '✕';
        removeButton.addEventListener('click', () => {
            activeFilters = activeFilters.filter(f=>f !== filter);
            if (filter.remove) {
                filter.remove();
            }
            applyFilters(activeFilters, sortedBooks);
            filterBooks();
        });
        tag.appendChild(textSpan);
        tag.appendChild(removeButton);
        filterTagsDiv.appendChild(tag);
    });
}