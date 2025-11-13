import { StatusCodes } from 'http-status-codes'
// import { env } from '~/config/environment'

// Middleware xử lý lỗi tập trung trong ứng dụng Back-end NodeJS (ExpressJS)
export const errorHandlingMiddleware = (err, req, res, next) => {

  // If the developer is not careful and forgets to include a statusCode, it will default to 500 INTERNAL_SERVER_ERROR.
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  // Create a variable called responseError to control what you want to return.
  const responseError = {
    statusCode: err.statusCode,
    // If the error doesn’t have a message, use the standard ReasonPhrase corresponding to the Status Code.
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack
  }
  // console.error(responseError)

  // Only when the environment is DEV should the Stack Trace be returned to make debugging easier; otherwise, it should be removed.
  // if (env.BUILD_MODE !== 'dev') delete responseError.stack

  // console.error(responseError)

  // Return the responseError to the Front-end.
  res.status(responseError.statusCode).json(responseError)
}