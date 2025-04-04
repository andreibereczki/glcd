import "reflect-metadata";
import path from 'path';
import * as dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { diBootstrap } from './di.bootstrap';
import { container } from 'tsyringe';
import { checkPrerequisites } from './check-prerequisites';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../", ".env") });

diBootstrap(container);
console.log(checkPrerequisites(container));
