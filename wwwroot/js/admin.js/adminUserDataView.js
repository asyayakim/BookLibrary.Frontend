import {deleteUser, fetchUserData, fetchUserProfile} from "./adminLoanedBooksController.js";
import {model} from "../model.js";
import {updateView} from "../main.js";

export function renderAdminViewUsersData() {

    document.getElementById('content').innerHTML = `
        <div id="viewSearch" class="viewBooks"></div>
        <div id="mainContainer" class="main-container">
            <button id="loadMoreBooks" class="load-more" style="display:none;">Load More Books</button>
            </div>
        </div>
        `;
    fetchUserData();
}

export function renderUsersForSearch(users) {
    console.log(users);
    const contentDiv = document.getElementById('viewSearch');
    contentDiv.innerHTML = '';
    contentDiv.className = 'admin-table';
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    users.forEach(user => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', user.id);
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.userName}</td>
            <td>${user.role}</td>
            <td>
                <button class="delete-button" data-id="${user.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    contentDiv.appendChild(table);
    attachEventListeners();
}

function attachEventListeners() {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.addEventListener('click', (event) => {

            if (!event.target.classList.contains('delete-button')) {
                const userId = row.getAttribute('data-id');

                fetchUserProfile(userId);
            }
        });
    });
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const userId = button.getAttribute('data-id');
            deleteUser(userId);
        });
    });
}

export function renderUsers(favorite, loanedBooks) {
    const contentDiv = document.getElementById('viewSearch');
    contentDiv.innerHTML = '';
    contentDiv.className = 'user-container';
    console.log(favorite);
    console.log(loanedBooks);
    if (favorite.length > 0 || loanedBooks.length > 0) {
        const userInfo = document.createElement('div');
        userInfo.className = 'user-info';
        userInfo.innerHTML = `
            <h2>User ID: ${favorite[0]?.userId || loanedBooks[0]?.userId}</h2>
            <p>Viewing favorite and loaned books for this user.</p>
    <button class="button-container">Return</button>
        `;
        contentDiv.appendChild(userInfo);
    }
    const returnButton = document.querySelector('.button-container');

    returnButton.addEventListener('click', function (event) {
        event.preventDefault();
        model.app.currentPage = 'usersData';
        updateView();
    });
    

    if (favorite.length > 0) {
        const favoriteSection = document.createElement('div');
        favoriteSection.innerHTML = '<h3>Favorite Books</h3>';
        contentDiv.appendChild(favoriteSection);

        const favoriteTable = createBookTable(favorite);
        contentDiv.appendChild(favoriteTable);
    }
    if (loanedBooks.length > 0) {
        const loanedSection = document.createElement('div');
        loanedSection.innerHTML = '<h3>Loaned Books</h3>';
        contentDiv.appendChild(loanedSection);

        const loanedTable = createBookTable(loanedBooks);
        contentDiv.appendChild(loanedTable);
    }
}

function createBookTable(books) {
    const table = document.createElement('table');
    table.className = 'user-table';

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>ISBN</th>
            <th>Loan Date</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    books.forEach(book => {
        const loanDate = new Date(book.loanDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${book.coverImageUrl}" alt="${book.title}"></td>
            <td>${book.title}</td>
            <td>${book.isbn}</td>
            <td>${loanDate || 'N/A'}</td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    return table;
}
