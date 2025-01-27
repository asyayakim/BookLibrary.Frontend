
import {renderBooksForSearch} from "./searchingBookView.js";
export async function fetchSearchedBooks(searchQuery) {
    try {
        const API_URL = 'http://localhost:5294/api/Book';
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
        renderBooksForSearch(filteredBooks);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

