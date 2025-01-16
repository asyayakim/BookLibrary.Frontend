import {updateView} from "./main.js";
import {model} from "./model.js";
import {authenticateUser} from "./loginController.js";
export function updateViewLogin() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
        <h2>Login</h2>
        <form id="loginForm">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <div class = "registerButtons">
            <button type="submit">Login</button>
            <button type="button" id="registrationButton">Register</button>
             </div>
            
        </form>
    `;
    

    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        authenticateUser(username, password);
    });
    const registerButton = document.getElementById('registrationButton');
    registerButton.addEventListener('click',async (event) => {
        event.preventDefault();
        model.app.currentPage = "registration";
        updateView();
    });
}
