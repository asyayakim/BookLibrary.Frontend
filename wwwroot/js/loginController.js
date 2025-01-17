import { updateView } from "./main.js";
import {model} from "./model.js";
import Config from "./utils/config.js";
export async function authenticateUser(username, password) {
    try {
        const response = await fetch(`${Config.apiBaseUrl}/auth/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ UserName: username, Password: password }),
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            console.error("Error during login:", errorMessage);
            throw new Error("Login failed");
        }
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.Token);
            console.log(data.token);
            model.app.token = data.Token;
            alert("Login successful!");
            const user = data.user;
            model.app.isLoggedIn = true;
            model.app.userRole = user;
            model.app.loggedInUser = user;
            console.log("Logged-in user in loanBook:", model.app.loggedInUser);

            model.app.currentPage = user.role === "admin" ? "adminDashboard" : "homeLibrary";
            updateView();
        } else {
            document.getElementById("error").innerText = "Invalid credentials!";
        }
    } catch (err) {
        console.error("Error during login:", err);
        alert("Login failed: " + error.message);
    }
   
}
