import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import { BOARD_TYPES } from '~/utils/constants'

import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next ) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(30).trim().strict().required(),
    description: Joi.string().min(3).max(30).trim().strict().required(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })

    // If validation is successful, proceed to the next middleware or controller
    next()

  } catch (error) {
    const errorMessage = new Error(error).message
    const customErrors = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customErrors)
  }
}

export const boardValidation = {
  createNew
}