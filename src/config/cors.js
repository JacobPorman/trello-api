import { WHITELIST_DOMAINS } from '~/utils/constants'
import { env } from '~/config/environment'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'


// Configure CORS Options in a real-world project
export const corsOptions = {
  origin: function (origin, callback) {

    // Allow calling API via POSTMAN in the development environment,
    // Normally when using Postman, the origin value will be undefined.
    if (!origin && env.BUILD_MODE === 'dev') {
      return callback(null, true)
    }

    // Check whether the origin is included in the allowed domain whitelist
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    // Finally, if the domain is not accepted, return an error
    return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`))
  },

  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,

  // CORS will allow receiving cookies from the request
  credentials: true
}