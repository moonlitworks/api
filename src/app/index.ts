import setupExpress from "./setupExpress"
import initializeOpenapi from "./initializeOpenapi"
import initializeSwagger from "./initializeSwagger"
import initializeDB from "./initializeDB"
import startServer from "./startServer"

export default () => Promise.resolve(setupExpress())
  .then(initializeOpenapi())
  .then(initializeSwagger())
  .then(initializeDB(process.env.DB_STRING))
  .then(startServer(process.env.PORT))
