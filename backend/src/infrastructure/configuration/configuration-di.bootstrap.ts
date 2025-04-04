import { DependencyContainer, Lifecycle } from 'tsyringe';
import { ConfigurationCheck } from './ConfigurationCheck';
import { InfrastructureDiType } from '../infrastructure-di-type';
import { Configuration } from './Configuration';
import { ExpressConfig } from '../express/express.interface';
import { PostgresDatabaseConfiguration } from '../db/db.interface';

export function configurationDiBootstrap(container: DependencyContainer) {
  container.register<ConfigurationCheck>(
    InfrastructureDiType.PrerequisiteCheck,
    { useClass: ConfigurationCheck },
    { lifecycle: Lifecycle.ContainerScoped }
  );

  container.register<ExpressConfig>(
    InfrastructureDiType.Configuration,
    { useClass: Configuration },
    { lifecycle: Lifecycle.ContainerScoped }
  );

  container.register<PostgresDatabaseConfiguration>(
    InfrastructureDiType.PostgresDatabaseConfiguration,
    { useClass: Configuration },
    { lifecycle: Lifecycle.Singleton }
  );
}
