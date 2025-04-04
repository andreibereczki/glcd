import { DependencyContainer } from 'tsyringe';
import { configurationDiBootstrap } from './configuration/configuration-di.bootstrap';

export function infrastructureDiBootstrap(container: DependencyContainer) {
  configurationDiBootstrap(container);
}
