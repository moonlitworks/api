import mongoose from "mongoose"
let db: typeof mongoose

const connect = async (dbString: string | undefined) => {
  if (dbString) {
    db = await mongoose.connect(dbString)
    console.info("MongoDB is set up")
  } else console.info("MongoDB is not set up")
}

const get = () => db

const isConnected = () => {
  const currentDB = get()
  if (!currentDB || !currentDB.connection) return false
  return currentDB.connection.readyState === mongoose.ConnectionStates.connected
}

const close = async () => db.disconnect()

export default {
  close,
  connect,
  get,
  isConnected,
}
