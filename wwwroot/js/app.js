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

document.getElementById("adminDashboard").addEventListener("click", () => {
    model.app.currentPage = "adminDashboard";
    updateView();
});

document.getElementById("logoutButton").addEventListener("click", () => {
    model.app.currentPage = "login";
    updateView();
});



