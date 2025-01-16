import { model } from "./model.js";
import {updateView} from "./main.js";
updateView();

document.getElementById("viewLibraryPage").addEventListener("click", () => {
    model.app.currentPage = "homeLibrary";
    updateView();
});

document.getElementById("adminDashboard").addEventListener("click", () => {
    model.app.currentPage = "adminDashboard";
    updateView();
});

document.getElementById("logoutButton").addEventListener("click", () => {
    model.app.currentPage = "login";
    updateView();
});


