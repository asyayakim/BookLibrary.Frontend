import {model} from "../model.js";
import Config from "../utils/config.js";
import {renderDbData} from "./adminLoanedBooksView.js";
import {fetchBooks} from "../viewLibraryPage.js";
import {updateView} from "../main.js";
import {renderUsersForSearch} from "./adminUserDataView.js";


export async function fetchUserData(){
    try {
        const response = await fetch(`http://localhost:5294/api/userData`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        renderUsersForSearch(data);

    } catch (error) {
        console.error('Error fetching books:', error);
    } 
}

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
        const response = await fetch(`${Config.apiBaseUrl}/book/${id}`, {method: 'DELETE'});
        console.log(id);
        if (response.ok) {
            model.app.currentPage = 'homeLibrary';
            await updateView();
        } else {
            console.error('Failed to delete book');
        }
    } catch (error) {
        console.error('Error deleting book:', error);
    }
}

window.deleteBook = deleteBook;
