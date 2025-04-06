import { version } from "../../../../package.json";
import { Router } from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../../../build/openapi/swagger.json";

export const bootstrapSwaggerUi = (router: Router) => {
  const options = {
    swaggerOptions: {
      url: "/api/swagger/swagger.json",
    },
  }
  router.get("/swagger/swagger.json", (req, res) => {
    swaggerDocument.info.version = version;
    res.json(swaggerDocument);
  });
  // @ts-ignore
  router.use('/swagger', swaggerUi.serveFiles(null, options), swaggerUi.setup(null, options));
};
