import express, { urlencoded } from "express";
import { bootstrapSwaggerUi } from "./openapi/swagger.bootstrap";
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';
import { fallbackMiddleware } from './middlewares/fallbackMiddleware';
import { RegisterRoutes } from "../../../build/routes/routes";
import { Table } from 'console-table-printer';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export function createServer() {
  const app: express.Application = express();

  app.disable("x-powered-by");

  app.set("etag", false);
  app.use(
    urlencoded({
      extended: true,
    })
  );
  // @ts-ignore
  app.use(cookieParser());
  app.use(express.json());

  const router = express.Router();
  router.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
  }));
  RegisterRoutes(router);
  bootstrapSwaggerUi(router);

  app.use('/api', router);
  app.use(errorHandlingMiddleware);
  app.use(fallbackMiddleware);

  // Get routes from express
  const routes: { path: string; methods: string[] }[] = router.stack
    .map(layer => {
      if (layer.route === undefined) {
        return;
      }

      return {
        path: layer.route.path,
        // @ts-ignore
        methods: Object.keys(layer.route.methods),
      };
    })
    .filter((element: undefined | { path: string; methods: string[] }) => element !== undefined);

  const routeTable = new Table({
    columns: [
      { name: "index", alignment: "left", color: "blue" },
      { name: "Route", alignment: "left" },
    ],
  });

  console.log("🔧 [Configured Routes]");
  routes.forEach((route: { path: string; methods: string[] }, index: number) =>
    routeTable.addRow({
      index,
      Method: route.methods.map(m => m.toUpperCase()).toString(),
      Route: route.path,
    })
  );
  routeTable.printTable();
  console.log();

  return app;
}
