import {registerNewUser} from "./registerNewUserController.js";
import {model} from "./model.js";
import {updateView} from "./main.js";

export function updateViewRegisterNewUser() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
       <h2>Register</h2>
        <form id="registrationForm">
            <label for="username">Username*:</label>
            <input type="text" id="username" name="username" required>
            <label for="password">Password*:</label>
            <input type="password" id="password" name="password" required>
            <label for="confirmPassword">Confirm Password*:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required>
            <div class = "registerButtons">
            <button type="submit">Confirm</button>
             </div>
        </form>
    `;
    document.getElementById('registrationForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        await registerNewUser(username, password);
    });
    const registerButton = document.getElementById('returnButton');
    registerButton.addEventListener('click',async (event) => {
        event.preventDefault();
        model.app.currentPage = "login";
        updateView();
    });
}
