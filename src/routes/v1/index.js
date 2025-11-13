import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoutes } from './boardRoutes.js'

const Router = express.Router()

// Check API V1 status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API V1 is running' })
})

// Board APIs
Router.use('/boards', boardRoutes)

export const APIs_V1 = Router