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

export function updateLoginButton() {
    const loginButton = document.querySelector('.login-btn');

    if (model.app.isLoggedIn) {
        loginButton.textContent = "Logout";
        loginButton.removeEventListener('click', handleLogin);
        loginButton.addEventListener('click', handleLogout);
    } else {
        loginButton.textContent = "Login";
        loginButton.removeEventListener('click', handleLogout);
        loginButton.addEventListener('click', handleLogin);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    updateLoginButton();
    updateView();
});

function handleLogout() {
    model.app.isLoggedIn = false;
    alert("User logged out!");
    updateLoginButton();
    model.app.currentPage = "homeLibrary";
    updateView();
}
function handleLogin() {
    model.app.isLoggedIn = true;
    model.app.currentPage = "homeLibrary";
    alert("User logged in!");
    updateLoginButton();
    updateView();
}


