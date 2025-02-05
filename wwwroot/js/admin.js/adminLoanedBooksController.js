import {model} from "../model.js";
import Config from "../utils/config.js";
import {renderDbData} from "./adminLoanedBooksView.js";
import {fetchBooks} from "../viewLibraryPage.js";




export async function fetchAdminViewUsers() {
    try {
        const response = await fetch(`http://localhost:5294/api/books/usersData`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        renderDbData(data);

    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

export async function deleteBook(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
        console.log(id);
        if (response.ok) {
            await fetchBooks();
        } else {
            console.error('Failed to delete book');
        }
    } catch (error) {
        console.error('Error deleting book:', error);
    }
}

window.deleteBook = deleteBook;
