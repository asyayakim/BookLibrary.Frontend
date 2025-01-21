import { model } from "./model.js";
import {updateView} from "./main.js";
import {fetchBooks} from "./viewLibraryPage.js";

export function renderAdminDashboard() {
    // document.getElementById('header').innerHTML = `
    //     <button id="viewLibraryPage">View Library</button>
    //     <button id="addBookPage">Add a Book</button>
    //     <button id="logoutButton">Log Out</button>
    // `;
    document.getElementById('content').innerHTML = `
        <h2>Welcome, Admin!</h2>
        `;

}
