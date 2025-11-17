/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Call Model layer to save the document of collection in database
    const createdBoard = await boardModel.createNew(newBoard)

    // Get board document after call Model layer to create
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    // Return the newly created board object to Controller layer
    return getNewBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}