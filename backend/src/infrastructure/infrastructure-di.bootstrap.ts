import { DependencyContainer } from 'tsyringe';
import { configurationDiBootstrap } from './configuration/configuration-di.bootstrap';
import { dbDiBootstrap } from './db/db-di.bootstrap';
import { repositoriesDiBootstrap } from './repositories/repositories-di.bootstrap';

export function infrastructureDiBootstrap(container: DependencyContainer) {
  configurationDiBootstrap(container);
  repositoriesDiBootstrap(container);
  dbDiBootstrap(container);
}
