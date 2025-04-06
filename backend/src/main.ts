import "reflect-metadata";
import path from 'path';
import * as dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { diBootstrap } from './di.bootstrap';
import { container } from 'tsyringe';
import { checkPrerequisites } from './check-prerequisites';
import { createServer } from './infrastructure/express/server';
import { InfrastructureDiType } from './infrastructure/infrastructure-di-type';
import { Configuration } from './infrastructure/configuration/Configuration';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../", ".env") });

diBootstrap(container);

const arePrerequisitesMet = await checkPrerequisites(container);

if (!arePrerequisitesMet) {
  process.exit(1);
}

const configuration = container.resolve<Configuration>(InfrastructureDiType.Configuration);
const port = configuration.getPort();

const server = createServer();
server.listen(port, () => console.log(`Application is running at http://localhost:${port}`))
