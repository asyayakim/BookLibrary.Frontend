import {model} from "./model.js";
import {postSelectedBookToDb, updateBookOnServer} from "./BookPageController.js";
const API_URL = 'http://localhost:5294/api/Book';

const contentDiv = document.getElementById('content');
export async function selectBook()
{
    const bookId = model.app.currentBookId;
    if (!bookId) {
        console.error("Error: No book ID found in model.app.currentBookId");
        return;
    }
    try {
        const response = await fetch(`${API_URL}/${bookId}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const book = await response.json(); 
        model.app.userRole === "admin" ? renderBookAdmin(book) : renderBook(book);
        
    }catch (error) {
        console.error('Error fetching book:', error);
    }
}
function renderBookAdmin(book){
    contentDiv.innerHTML = '';
    contentDiv.className = 'selected-book-layout-admin';

    const bookDiv = document.createElement('div');
    bookDiv.className = 'selected-book-layout-admin';
    bookDiv.innerHTML = `
           <div class="book-details">
            <h1>Edit Book</h1>
            <form id="editBookForm">
                <label>Title:</label>
                <input type="text" id="title" value="${book.title}" required>

                <label>Author:</label>
                <input type="text" id="author" value="${book.author}" required>

                <label>Genre:</label>
                <input type="text" id="genre" value="${book.genre}" required>

                <label>Year:</label>
                <input type="number" id="year" value="${book.year}" required>

                <label>ISBN:</label>
                <input type="text" id="isbn" value="${book.isbn}" required>

                <label>Cover Image URL:</label>
                <input type="url" id="coverImageUrl" value="${book.coverImageUrl}">
                <button type="submit" class="save-btn">Save changes</button>
                <div class="book-cover">
            <img src="${book.coverImageUrl}" alt="${book.title}">
        </div>
            </form>
                <button class="deleteButton" data-id="${book.id}">Delete</button>
        </div>

        
    `;
    contentDiv.appendChild(bookDiv);
    const DeleteButtons = document.querySelectorAll('.deleteButton');
    DeleteButtons.forEach((button) => {
        button.addEventListener('click', async () => {
            const id = button.getAttribute('data-id');
            await deleteBook(id);
        });
    });
    const form = document.getElementById('editBookForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const updatedBook = {
            id: book.id,
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            genre: document.getElementById('genre').value,
            year: document.getElementById('year').value,
            isbn: document.getElementById('isbn').value,
            coverImageUrl: document.getElementById('coverImageUrl').value,
        };

        await updateBookOnServer(updatedBook);
    });
}
export function renderBook(book) {
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
            <button class="loan-btn">Loan this Book</button>
        </div>
         <div class="book-cover">
            <img src="${book.coverImageUrl}" alt="${book.title}">
        </div>
    `;
    contentDiv.appendChild(bookDiv);
    const loanButton = bookDiv.querySelector('.loan-btn');
    loanButton.addEventListener('click', () => loanBook(book)); 
}
function loanBook(book){
    if (model.app.loggedInUser == null)
    {
        alert("Login for loan the book");
    }
    else {
        postSelectedBookToDb(book);
    }
}
