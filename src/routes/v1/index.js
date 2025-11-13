import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from '~/routes/v1/boardRoute.js'

const Router = express.Router()

// Check API V1 status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API V1 is running' })
})

// Board APIs
Router.use('/boards', boardRoute)

export const APIs_V1 = Router