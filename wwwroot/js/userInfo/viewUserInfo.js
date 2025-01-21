import {registerNewUser} from "../registerNewUserController.js";
import {showLoanedBooks} from "./viewUserInfoController.js";

export async function viewUserInfo() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
       <h2>Change user info</h2>
        <form id="changePersonalInformation">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <label for="password">Password*:</label>
            <input type="password" id="password" name="password" required>
            <label for="confirmPassword">Confirm Password*:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required>
            <div class = "registerButtons">
            <button type="submit">Confirm</button>
             </div>
        </form>
        <h3>Loaned Books</h3>
        <div id="bookLoanedByUser"></div>
        
    `;
    document.getElementById('changePersonalInformation').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        await registerNewUser(username, password);
    });

    await showLoanedBooks();

}