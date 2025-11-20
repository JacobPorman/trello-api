/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'

import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

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

const getDetails = async (boardId) => {
  try {

    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board is not found!')
    }

    // Clone deep a new board to handle
    const resBoard = cloneDeep(board)

    // Route card to right column because the mock-data in FE != BE so we must have change structure in FE or BE
    resBoard.columns.forEach(column => {
      // Convert ObjectId to String to compare id
      column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })

    // Delete cards array in init resBoard
    delete resBoard.cards

    return resBoard
  } catch (error) {
    throw error
  }
}

// Update Board
const update = async ( boardId, reqBody ) => {
  try {
    const updateData = {
      ...reqBody,
      updateAt: Date.now()
    }

    const updateBoard = await boardModel.update(boardId, updateData)

    return updateBoard
  } catch (error) {
    throw error
  }
}


const moveCardToDifferentColumn = async ( reqBody ) => {
  try {
    //  * Step 1: Update the cardOrderIds array of the original Column (basically removing the card’s _id from the array)
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updateAt: Date.now()
    })

    //  * Step 2: Update the cardOrderIds array of the target Column (basically adding the card’s _id to the array)
    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updateAt: Date.now()
    })

    //  * Step 3: Update the new columnId field of the dragged card
    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId
    })


    return { updateResult: 'Success' }
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}