
// Define a separate ApiError class that extends the built-in Error class (this is necessary and considered a best practice because Error is a built-in class).
class ApiError extends Error {
  constructor(statusCode, message) {

    super(message)

    // Set the name property to the class name (this is useful for identifying the error type when handling errors).
    this.name = 'ApiError'

    this.statusCode = statusCode

    // Capture the stack trace (this helps with debugging by providing the call stack at the point where the error was created).
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError