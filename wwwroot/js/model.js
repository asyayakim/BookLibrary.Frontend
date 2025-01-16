export const model = {
    app: {
        currentPage: "homeLibrary",
        loggedInUser: null,
        currentBookId: null
    },
    inputs: {
        login: {
            email: "",
            password: "",
            error: "",
        },
    },
    users: [
        {
            id: 1,
            userName: "admin",
            userEmail: "admin@example.com",
            password: "admin123",
            isAdmin: true,
        },
        {
            id: 2,
            userName: "user1",
            userEmail: "user1@example.com",
            password: "user123",
            isAdmin: false,
        },
    ],
};
