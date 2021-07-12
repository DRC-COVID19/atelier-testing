import mongoose from 'mongoose'

const connect = (MONGO_URL) => {
  console.log('MONGO_URL', MONGO_URL)
  mongoose
    .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('database connected')
    })
    .catch(err =>
      console.log(
                `database error \n${err}`
      )
    )
}

if (process.env.NODE_ENV === 'testing') {
  (async () => {
    const { MongoMemoryServer } = require('mongodb-memory-server')
    const mongoMemory = await MongoMemoryServer.create()
    connect(mongoMemory.getUri())
  })()
} else {
  const { MONGO_DB_NAME, MONGO_PASSWORD, MONGO_USER, MONGO_HOSTNAME, MONGO_SRV, MONGO_PORT } = process.env
  let MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin&retryWrites=true&w=majority`
  if (MONGO_SRV) {
    MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB_NAME}?retryWrites=true&w=majority`
  }
  connect(MONGO_URL)
}
module.exports = mongoose
