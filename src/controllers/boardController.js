import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next ) => {
  try {

    // Routing data to Service layer to handle business logic
    const createdBoard = await boardService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdBoard)
    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'This is a simulated error from boardController.createNew')

  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew
}