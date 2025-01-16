import { model } from "./model.js";
import {updateView} from "./main.js";
updateView();

document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.querySelector('.login-btn');
    loginButton.addEventListener('click', function () {
        model.app.currentPage = "login";
        updateView();
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.querySelector('.logo');
    loginButton.addEventListener('click', function () {
    model.app.currentPage = "homeLibrary";
    updateView();
});
});
document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.querySelector('.search-bar');
    loginButton.addEventListener('click', function () {
        model.app.currentPage = "homeLibrary";
        updateView();
    });
});
export function updateHeader() {
    const nav = document.querySelector("nav ul");
    nav.innerHTML = `
        <li>
            <form class="search-bar">
                <input type="text" placeholder="Search for books..." aria-label="Search">
                <img src="images/search.svg" width="16" height="16" alt="Search Icon">
            </form>
        </li>
        <li>
            <button class="${model.app.isLoggedIn ? "logout-btn" : "login-btn"}">
                ${model.app.isLoggedIn ? "Logout" : "Login"}
            </button>
        </li>
    `;    const button = document.querySelector(model.app.isLoggedIn ? ".logout-btn" : ".login-btn");
    button.addEventListener("click", model.app.isLoggedIn ? handleLogout : () => {
        model.app.currentPage = "login";
        updateView();
    });
}
export function handleLogout() {
    model.app.isLoggedIn = false;
    model.app.userRole = null;
    localStorage.removeItem("token");
    model.app.currentPage = "login";
    alert("Logged out successfully!");
    updateView(); 
}



