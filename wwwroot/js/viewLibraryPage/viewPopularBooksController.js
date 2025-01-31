import {renderLoanedBooks} from "../userInfo/viewUserInfo.js";



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

    container.innerHTML = books.length > 0
        ? books.map(book => {
            let truncatedTitle = book.title.length > 30 ? book.title.substring(0, 30) + '...' : book.title;
           
            return `
                <div class="book-card">
                    <img src="${book.coverImageUrl || 'images/book.svg'}" alt="${book.title}">
                    <div class="book-title">
                        <h3 title="${book.title}">${truncatedTitle}</h3>
                    </div>
                </div>
            `;
        }).join('')
        : '<p>No popular books found.</p>';
}
