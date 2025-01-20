import Config from "./utils/config.js";
import {model} from "./model.js";

export async function postSelectedBookToDb(loanedBook) {
    // const token = localStorage.getItem("token");
    //
    // if (!token) {
    //     alert("You must log in first!");
    //     return;
    // }
    //console.log("Authorization Header:", `Bearer ${token}`);
    const loanedBookPayload = {
        Isbn: loanedBook.isbn, 
        Title: loanedBook.title,
        LoanDate: new Date().toISOString(),
        UserId: model.app.loggedInUser.id 
    };
    
    try {
        const response = await fetch(`${Config.apiBaseUrl}/books/loan`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(loanedBookPayload),
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            console.error("Error during posting book:", errorMessage);
            throw new Error(`Posting failed: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        alert("Book successfully loaned!");
    } catch (err) {
        console.error("Error during push:", err);
        alert("Push failed: " + err.message);
    }
}