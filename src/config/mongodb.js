

// eslint-disable-next-line no-unused-vars

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'


// Initialize an object trelloDatabaseInstance with a value of null initially because the connection has not been connected yet.
// Is Database on Atlas
let trelloDatabaseInstance = null

// Create a new MongoClient instance to connect to the MongoDB server using the provided URI and options.
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// Connect to MongoDB
export const CONNECT_DB = async () => {
  // Connect to MongoDB Atlas with URI in mongoClientInstance
  await mongoClientInstance.connect()

  // mongoClientInstance.db() method is used to get a reference to a specific database by its name.
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// This function has a mission to export the trelloDatabaseInstance object after the connection is successful.
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Database not connected yet. Please CONNECT_DB first.')
  return trelloDatabaseInstance
}

// Close the database connection
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}