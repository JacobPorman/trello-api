/* eslint-disable no-console */

import express from 'express'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'

const START_SERVER = () => {

  const app = express()

  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello ${ env.AUTHOR }, I am running at http://${ env.APP_PORT }:${ env.APP_HOST }/`)
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

