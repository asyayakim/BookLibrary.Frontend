import { updateViewLogin } from "./login.js";
import { fetchBooks } from "./viewLibraryPage.js";
import { renderAddBookPage } from "./addBook.js";
import { updateViewRegisterNewUser} from "./registerNewUserView.js";
import { renderAdminDashboard } from "./adminDashboard.js";
import { model } from "./model.js";
import {selectBook} from "./BookPageView.js";

export function updateView() {
    console.log("updateView function is loaded.");
    const page = model.app.currentPage;

    if (page === "login") {
        updateViewLogin(); 
    } else if (page === "homeLibrary") {
        fetchBooks();
    } else if (page === "selectedBookPage") {
        selectBook();
    } else if (page === "registration") {
        updateViewRegisterNewUser();
    } else if (page === "adminDashboard") {
        renderAdminDashboard();
    } else if (page === "addBook") {
        renderAddBookPage();
    } else {
        document.getElementById("content").innerHTML = `<h1>Page not found</h1>`;
    }
}
