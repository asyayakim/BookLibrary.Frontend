import {model} from "../model.js";
import Config from "../utils/config.js";
import {renderDbData} from "./adminLoanedBooksView.js";
import {updateView} from "../main.js";
import {renderUsers, renderUsersForSearch} from "./adminUserDataView.js";

export async function fetchUserData() {
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

export async function fetchUserProfile(userId) {
    console.log(userId);
    const favoriteAPI = `http://localhost:5294/api/books/showFavorite?userId=${userId}`;
    const loanedBooksAPI = `http://localhost:5294/api/books/loaned?userId=${userId}`;
    try {
        const [favoriteResponse, loanedResponse] = await Promise.all([
            fetch(favoriteAPI),
            fetch(loanedBooksAPI)
        ]);
        if (!favoriteResponse.ok) {
            if (favoriteResponse.status === 404) {
                console.warn('No favorite books found.');
            } else {
                throw new Error(`Favorite books error: ${favoriteResponse.status}`);
            }
        }
        if (!loanedResponse.ok) {
            alert(`Loaned books error: ${loanedResponse.status}`);
        }
        const favorite = favoriteResponse.ok ? await favoriteResponse.json() : [];
        const loanedBooks = loanedResponse.ok ? await loanedResponse.json() : [];
        if (favorite.length === 0 && loanedBooks.length === 0) {
            alert('No favorite or loaned books found for this user.');
            return;
        }
        renderUsers(favorite, loanedBooks);
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
}
export async function deleteUser(userId) {
    console.log(userId);
        const userLoginAPI  = `http://localhost:5294/api/admin/${userId}`;
        const favoriteAPI = `http://localhost:5294/api/book/deleteAllFavoriteBooks?userId=${userId}`;
        const loanedBooksAPI = `http://localhost:5294/api/book/deleteAllLoanedBooks?userId=${userId}`;
    try {
        const [userResponse, favoriteResponse, loanedResponse] = await Promise.all([
            fetch(userLoginAPI, { method: "DELETE" }),
            fetch(favoriteAPI, { method: "DELETE" }),
            fetch(loanedBooksAPI, { method: "DELETE" }),
        ]);
        if (!favoriteResponse.ok) {
            console.warn(`Favorite books error: ${favoriteResponse.status}`);
        }
        if (!loanedResponse.ok) {
            alert(`Loaned books error: ${loanedResponse.status}`);
        }
        if(!userResponse) {
            alert(`User delete failed: ${userLoginAPI}`);
            return;
        }
        if (userResponse.ok && favoriteResponse.ok && loanedResponse.ok) {
            alert("User and associated data deleted successfully.");
        } else {
            alert("Some data could not be deleted. Check logs for more details.");
        }
        updateView();
    } catch (error) {
        console.error('Error fetching user profile:', error);
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
export async function changeUsernamePassword(username, password){
    console.log(username, password);
    try {
        const role = model.app.userRole;
        const userId = model.app.loggedInUser;
        console.log(userId, role);
        const response = await fetch(`${Config.apiBaseUrl}/userData/changeUserData`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ UserName: username, Password: password, Id: userId, Role: role }),
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        alert('User updated successfully!');
    } catch (error) {
        console.error('Detailed error:', error);
        alert(`Failed to update user: ${error.message}`);
    }
}