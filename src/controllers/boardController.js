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

const getDetails = async (req, res, next ) => {
  try {
    const boardId = req.params.id

    // Routing data to Service layer to handle business logic
    const board = await boardService.getDetails(boardId)

    res.status(StatusCodes.OK).json(board)

  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next ) => {
  try {
    const boardId = req.params.id

    const updatedBoard = await boardService.update(boardId, req.body)

    res.status(StatusCodes.OK).json(updatedBoard)

  } catch (error) {
    next(error)
  }
}

const moveCardToDifferentColumn = async (req, res, next ) => {
  try {

    const result = await boardService.moveCardToDifferentColumn(req.body)

    res.status(StatusCodes.OK).json(result)

  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}