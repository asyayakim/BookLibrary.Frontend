import {renderLoanedBooks} from "../userInfo/viewUserInfo.js";
import {selectBookPage} from "../viewLibraryPage.js";



export async function showPopularBooks() {
    const API_URL = `http://localhost:5294/api/books/mostLoaned`;
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
        const popularBooks = await response.json();
        console.log(popularBooks);

        renderPopularBooks(popularBooks);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}
function renderPopularBooks(books) {
    const container = document.getElementById('popularBooks');
    container.innerHTML = '';
    if (books.length === 0) {
        container.innerHTML = '<p>No popular books found.</p>';
        return;
    }
    books.forEach(book => {
        let truncatedTitle = book.title.length > 30 ? book.title.substring(0, 30) + '...' : book.title;

        const bookDiv = document.createElement('div');
        bookDiv.className = 'book-card-horizontal';
        bookDiv.innerHTML = `
            <img src="${book.coverImageUrl || 'images/book.svg'}" alt="${book.title}">
            <div class="book-title">
                <h3 title="${book.title}">${truncatedTitle}</h3>
            </div>
        `;
        // bookDiv.addEventListener('click', () => {
        //     if (!book.id) {
        //         console.error("Error: Book has no ID", book);
        //         return;
        //     }
        //     selectBookPage(book.id);
        // });

        container.appendChild(bookDiv);
    });
}
