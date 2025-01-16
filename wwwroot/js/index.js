import axios from 'axios';
import Config from "./utils/config.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await axios.post(`${Config.apiBaseUrl}/auth/login`, {
            username,
            password,
        });
        console.log("Login successful:", response.data);
    } catch (error) {
        console.error("Error during login:", error);
    }
});
