/* eslint-disable no-console */

import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1/index.js'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware.js'


const START_SERVER = () => {

  const app = express()

  // Handle Cors
  app.use(cors(corsOptions))

  // Middleware to parse JSON request bodies
  app.use(express.json())

  app.use('/v1', APIs_V1)

  // Global error handling middleware
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello ${ env.AUTHOR }, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  exitHook(() => {
    // console.log('Disconnecting DB')
    CLOSE_DB()
    // console.log('Disconnected DB')

  })
}

// Immediately Invoked Function Expression (IIFE) to handle asynchronous operations at the top level.
(async () => {
  try {
    // Only connecting to the database is successful, start the server.
    console.log('Connecting to the MongoDB Atlas!')
    await CONNECT_DB()
    console.log('Connected to MongoDB Atlas!')

    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

