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
            alert("Incorrect username or password");
        }
        if (response.ok) {
            const data = await response.json();
            // const token = data.token || data.Token; 
            // localStorage.setItem("token", token);
            // model.app.token = token;
            
            const user = data.user;
            model.app.isLoggedIn = true;
            model.app.userRole = user.role;
            console.log(`User role was ${model.app.userRole}`);
            model.app.loggedInUser = user.id;
            console.log(model.app.loggedInUser);

            // model.app.token = data.Token;
              model.app.currentPage = user.role === "admin" ? "adminDashboard" : "userInfo";
            updateView();
        } else {
            document.getElementById("error").innerText = "Invalid credentials!";
        }
    } catch (err) {
        console.error("Error during login:", err);
        alert("Login failed: " + error.message);
    }
   
}
