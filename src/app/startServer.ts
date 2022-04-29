import express from "express"

export const logCallback = (port: number) => {
  console.log(`API server running at port ${ port }\nhttp://localhost:${port}`)
}

export default (
  port: string | number = 80
) => (
  app: express.Application
) => {
  app.listen(+port, () => logCallback(+port))
  return app
}
