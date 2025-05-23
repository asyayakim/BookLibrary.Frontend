import {model} from "./model.js";
import {updateView} from "./main.js";
import {fetchSearchedBooks} from "./searchBooks/searchingBookController.js";

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
        
        if (model.app.userRole === 'admin') {
            model.app.currentPage = "adminDashboard";
            updateView();
        } else {
            model.app.currentPage = "homeLibrary";
            updateView();
        }
    });
});

export function updateHeader() {
    const nav = document.querySelector("nav ul");
    nav.innerHTML = `
        <li>
            <form class="search-bar ${model.app.searchMode ? 'active' : ''}">
                ${
        model.app.searchMode
            ? `
                            <img src="images/search.svg" width="24" height="24" alt="Search Icon">
                            <input type="text" placeholder="Search..." aria-label="Search">
                            `
            : `
                            <button class="search-bar-button">
                                <img src="images/search.svg" width="16" height="16" alt="Search Icon">
                            </button>`
    }
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
    const searchButton = document.querySelector('.search-bar-button');
    if (searchButton) {
        searchButton.addEventListener('click', function (event) {
            event.preventDefault();
            model.app.searchMode = true; 
            console.log(model.app.searchMode);
            model.app.currentPage = 'searchBook';
            updateView();
        });
    }

    const searchForm = document.querySelector('.search-bar');
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchQuery = searchForm.querySelector('input').value.trim();

        if (searchQuery) {
            fetchSearchedBooks(searchQuery);
        } else {
            alert('Please enter a search term.');
        }
    });

    const button = document.querySelector(model.app.isLoggedIn ? ".logout-btn" : ".login-btn");
    button.addEventListener("click", model.app.isLoggedIn ? handleLogout : () => {
        model.app.currentPage = "login";
        updateView();
    });
    if (model.app.isLoggedIn) {
        const userLogin = document.querySelector("#userLogin");
        userLogin.addEventListener("click", function () {
            if (model.app.userRole === 'admin') {
                model.app.currentPage = "adminInfo";
                updateView();
            }
            else {
                model.app.currentPage = "userInfo";
                updateView();
            }
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



