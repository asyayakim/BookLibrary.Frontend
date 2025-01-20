import { model } from "./model.js";
import {updateView} from "./main.js";
import {fetchSearchedBooks} from "./searchingBook.js";

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
    const searchForm = document.querySelector('.search-bar');
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchQuery = searchForm.querySelector('input').value.trim();

        if (searchQuery) {
            console.log(`Searching for: ${searchQuery}`);
            fetchSearchedBooks(searchQuery);
        } else {
            alert('Please enter a search term.');
        }
    });
});

export function updateHeader() {
    const nav = document.querySelector("nav ul");
    nav.innerHTML = `
        <li>
            <form class="search-bar">
                <img src="images/search.svg" width="16" height="16" alt="Search Icon">
                <input type="text" placeholder="Search for books..." aria-label="Search">
            </form>
        </li>
        <li>
            <button class="${model.app.isLoggedIn ? "logout-btn" : "login-btn"}">
                ${model.app.isLoggedIn ? "Logout" : "Login"}
            </button>
        </li>
             ${model.app.isLoggedIn
        ? `<div id="userLogin">
                   <img src="/images/person-circle.svg" alt="User icon">
               </div>`
        : ""}
    `;  
    const button = document.querySelector(model.app.isLoggedIn ? ".logout-btn" : ".login-btn");
    button.addEventListener("click", model.app.isLoggedIn ? handleLogout : () => {
        model.app.currentPage = "login";
        updateView();
    });
    if (model.app.isLoggedIn) {
        const userLogin = document.querySelector("#userLogin");
        userLogin.addEventListener("click", function () {
            model.app.currentPage = "userInfo";
            updateView();
        });
    }
}
export function handleLogout() {
    model.app.isLoggedIn = false;
    model.app.userRole = null;
    localStorage.removeItem("token");
    model.app.currentPage = "login";
    alert("Logged out successfully!");
    updateView(); 
}



