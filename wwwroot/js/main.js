import { updateViewLogin } from "./login.js";
import { fetchBooks } from "./viewLibraryPage.js";
import { renderAddBookPage } from "./addBook.js";
import { updateViewRegisterNewUser} from "./registerNewUserView.js";
import { model } from "./model.js";
import {selectBook} from "./BookPageView.js";
import {updateHeader} from "./app.js";
import {viewUserInfo} from "./userInfo/viewUserInfo.js";
import {renderAdminDashboard} from "./admin.js/adminDashboard.js";
import {renderAdminViewUsers} from "./admin.js/adminLoanedBooksView.js";

export function updateView() {
    updateHeader();
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
    } else if (page === "adminViewUsers&Books") {
        renderAdminViewUsers();
    } else if (page === "userInfo") {
        viewUserInfo();
    } else {
        document.getElementById("content").innerHTML = `<h1>Page not found</h1>`;
    }
}
