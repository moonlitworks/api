import express from "express"
import { serve as swaggerServe, setup as swaggerSetup } from "swagger-ui-express"

type SwaggerOptions = {
  path: string
  oasUrl: string
  title?: string
  faviconUrl?: string
  customCss?: string
}

const defaultSwaggerOptions: SwaggerOptions = {
  path: "/docs",
  title: "Moonlit Works API",
  faviconUrl: "https://cdn.moonlit.works/www/favicon.ico",
  customCss: '.swagger-container > .topbar, .swagger-container > .wrapper, .info > .main > .link { display: none }',
  oasUrl: "/oas3"
}

export default (
  swaggerOptions: SwaggerOptions = defaultSwaggerOptions,
) => (
  app: express.Application,
) => {
  app.use(swaggerOptions.path, swaggerServe, swaggerSetup(undefined, {
    customSiteTitle: swaggerOptions.title,
    customfavIcon: swaggerOptions.faviconUrl,
    customCss: defaultSwaggerOptions.customCss,
    swaggerOptions: {
      url: swaggerOptions.oasUrl,
      displayOperationId: true,
    },
  }))
  return app
}
