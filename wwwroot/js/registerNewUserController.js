
import {model} from "./model.js";
import {updateView} from "./main.js";
import Config from "./utils/config.js";

export async function  registerNewUser(username, password){
    try {
        const response = await fetch(`${Config.apiBaseUrl}/auth/register`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ UserName: username, Password: password }),
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            console.error("Error during login:", errorMessage);
            alert(errorMessage);
        }
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            localStorage.setItem("token", data.Token);
            alert("Registration successful!");
            model.app.currentPage = 'login';
            updateView();
        } else {
            document.getElementById("error").innerText = "Invalid credentials!";
        }
    } catch (err) {
        console.error("Error during registration:", err);
        alert("Registration failed: " + error.message);
    } 
}