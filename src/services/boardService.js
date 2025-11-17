/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Return the newly created board object
    return newBoard

  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}