
import {fetchUserData} from "./adminLoanedBooksController.js";

export function renderAdminViewUsersData (){

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
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.userName}</td>
            <td>${user.role}</td>
            <td>
                <button class="edit-button" data-id="${user.id}">Edit</button>
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

    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const userId = button.getAttribute('data-id');
            editUser(userId);
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
function editUser(userId) {
    console.log(`Edit user with ID: ${userId}`);

}

function deleteUser(userId) {
    console.log(`Delete user with ID: ${userId}`);
    // Add your delete logic here
}