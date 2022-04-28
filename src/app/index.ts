import setupExpress from "./setupExpress"
import initializeOpenapi from "./initializeOpenapi"
import initializeSwagger from "./initializeSwagger"
import startServer from "./startServer"

export default () => Promise.resolve(setupExpress())
  .then(initializeOpenapi())
  .then(initializeSwagger())
  .then(startServer(process.env.PORT))
