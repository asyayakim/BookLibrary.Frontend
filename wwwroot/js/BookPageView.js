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
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';
    bookDiv.innerHTML = `
        
        <img src="${book.coverImageUrl}" alt="${book.title}" style="width:100%; height:auto; border-radius:5px; margin-bottom:10px;">
            <div class="book-info" onclick="selectBook(${book.id})">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>Year:</strong> ${book.year}</p>
                <p><strong>ISBN:</strong> ${book.isbn}</p>
                <button onclick="deleteBook(${book.id})" style="background-color: #e75c5c; border: none; padding: 0.5rem 1rem; color: white; cursor: pointer; border-radius: 5px;">Delete</button>
            </div>
    `;
    contentDiv.appendChild(bookDiv);
    
}