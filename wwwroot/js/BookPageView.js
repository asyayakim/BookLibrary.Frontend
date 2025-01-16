import {model} from "./model.js";
const API_URL = 'http://localhost:5294/api/Book';

const contentDiv = document.getElementById('content');
export async function selectBook()
{
    const bookId = model.app.currentBookId;
    try {
        const response = await fetch(`${API_URL}/${bookId}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const book = await response.json(); 
        renderBook(book);
    }catch (error) {
        console.error('Error fetching book:', error);
    }
}
function renderBook(book) {
    contentDiv.innerHTML = '';
    contentDiv.className = 'selected-book-layout';

    const bookDiv = document.createElement('div');
    bookDiv.className = 'selected-book';
    bookDiv.innerHTML = `
       
        <div class="book-details">
            <h1>${book.title}</h1>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            <p><strong>ISBN:</strong> ${book.isbn}</p>
            <button class="loan-btn" onclick="loanBook(${book.id})">Loan this Book</button>
        </div>
         <div class="book-cover">
            <img src="${book.coverImageUrl}" alt="${book.title}">
        </div>
    `;
    contentDiv.appendChild(bookDiv);
    
}