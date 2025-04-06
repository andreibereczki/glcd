import { DependencyContainer, Lifecycle } from 'tsyringe';
import { InfrastructureDiType } from '../infrastructure-di-type';
import { DatabaseInitialization } from './DatabaseInitialization';
import { DatabaseConnectionCheck, HealthCheck } from './DatabaseConnectionCheck';
import { DBExtensions, ExtendedDatabaseProtocol } from './db.interface';
import { IMain } from 'pg-promise';
import { IClient } from 'pg-promise/typescript/pg-subset';

export function dbDiBootstrap(container: DependencyContainer) {
  container.register<DatabaseInitialization>(
    InfrastructureDiType.DatabaseInitialization,
    { useClass: DatabaseInitialization },
    { lifecycle: Lifecycle.Singleton }
  );

  const dbInitializer = container.resolve(DatabaseInitialization);
  const { db, pgp } = dbInitializer.init();

  container.register<ExtendedDatabaseProtocol>(
    InfrastructureDiType.DatabaseInstance,
    { useValue: db }
  );

  container.register<IMain<DBExtensions, IClient>>(
    InfrastructureDiType.DatabaseInstanceHelper,
    { useValue: pgp }
  );

  container.register<HealthCheck>(
    InfrastructureDiType.PrerequisiteCheck,
    { useClass: DatabaseConnectionCheck },
    { lifecycle: Lifecycle.ContainerScoped }
  );
}
