import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next ) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(30).trim().strict().required(),
    description: Joi.string().min(3).max(30).trim().strict().required()
  })

  try {
    console.log('req.body: ', req.body)
    await correctCondition.validateAsync(req.body, { abortEarly: false })

    // next()

    res.status(StatusCodes.CREATED).json({ message: 'POST from Validation: API create a new board' })

  } catch (error) {
    console.log(error)
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}