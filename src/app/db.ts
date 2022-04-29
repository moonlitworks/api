import mongoose from "mongoose"
let db: typeof mongoose

const connect = async (dbString: string | undefined) => {
  if (dbString) {
    db = await mongoose.connect(dbString)
    console.info("MongoDB is set up")
  } else console.info("MongoDB is not set up")
}

const get = () => db

const isConnected = () => db.connection.readyState === mongoose.ConnectionStates.connected

const close = async () => db.disconnect()

export default {
  close,
  connect,
  get,
  isConnected,
}
