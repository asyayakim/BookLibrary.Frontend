
import {activeFilters, renderBooksForSearch} from "./searchingBookView.js";
import {applyFilters} from "./searchingBookFiltr.js";
export async function fetchSearchedBooks(searchQuery) {
    try {
        const API_URL = 'http://localhost:5294/api/Book';
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let books = await response.json();
        let filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (activeFilters.length > 0) {
            applyFilters(activeFilters, filteredBooks);
        } else {
            renderBooksForSearch(filteredBooks);
        }
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

