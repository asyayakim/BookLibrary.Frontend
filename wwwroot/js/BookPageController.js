import Config from "./utils/config.js";

export async function postSelectedBookToDb(loanedBook) {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
        alert("You must log in first!");
        return;
    }
    try {
        const response = await fetch(`${Config.apiBaseUrl}/books/loan`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({LoanedBooks: loanedBook}),
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            console.error("Error during posting book:", errorMessage);
            throw new Error("Posting failed");
        }
        const data = await response.json();
        console.log(data);
        alert("Book successfully loaned!");
    } catch (err) {
        console.error("Error during push:", err);
        alert("Push failed: " + error.message);
    }
}