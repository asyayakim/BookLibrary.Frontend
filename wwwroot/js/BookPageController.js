import Config from "./utils/config.js";
import {model} from "./model.js";

export async function postSelectedBookToDb(loanedBook) {
    
    const loanedBookPayload = {
        CoverImageUrl: loanedBook.coverImageUrl,
        Isbn: loanedBook.isbn, 
        Title: loanedBook.title,
        LoanDate: new Date().toISOString(),
        UserId: model.app.loggedInUser 
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

export async function addToFavorite(book) {
  
    const favoriteBook = {
        CoverImageUrl: book.coverImageUrl,
        Isbn: book.isbn,
        Title: book.title,
        UserId: model.app.loggedInUser,
    };
    console.log(favoriteBook);

    try {
        const response = await fetch(`${Config.apiBaseUrl}/books/favorite`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(favoriteBook),
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            if (response.status === 409) {
                alert("This book is already in your favorites.");
                return;
            }
            throw new Error(`Posting failed: ${response.status} - ${errorMessage}`);
        }
        alert("Book successfully added to the list!");
    } catch (err) {
        console.error("Error during push:", err);
        alert("Push failed: " + err.message);
    }
}