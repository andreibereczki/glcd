import { DependencyContainer } from 'tsyringe';
import { infrastructureDiBootstrap } from './infrastructure/infrastructure-di.bootstrap';

export function diBootstrap(container: DependencyContainer) {
  infrastructureDiBootstrap(container);
}
