export enum Errors {
    NoToken = "No token provided.",
    InvalidToken = "Invalid token.",
    NoAuthHeader = "No Authorization header",
    InvalidCredentials = "Invalid credentials.",
    Unauthorized = "Unauthorized",
    InvalidId = "Invalid user",
    InvalidTaskId = "Invalid task id",
    InvalidTask = "That task doesn't exist for you.",
    ServerError = "Internal Server Error",
}

export enum Success {
    UserRegistered = "User registered successfuly.",
    UserLogged = "User logged in succesfully.",
    TaskCreated = "Task created successfully.",
    TaskUpdated = "Task updated successfully.",
    TaskDeleted = "Task deleted successfully.",
}
