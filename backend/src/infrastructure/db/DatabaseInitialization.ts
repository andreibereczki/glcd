import { inject, injectable } from 'tsyringe';
import pgPromise, { IInitOptions } from 'pg-promise';
import { InfrastructureDiType } from '../infrastructure-di-type';
import { DBExtensions, PostgresDatabaseConfiguration } from './db.interface';


@injectable()
export class DatabaseInitialization {

  constructor(
    @inject(InfrastructureDiType.PostgresDatabaseConfiguration) private readonly _databaseConfiguration: PostgresDatabaseConfiguration,
  ){}

  public init() {
    const initOptions: IInitOptions<DBExtensions> = {
      query: (event) => {
        console.log(event.query);
      },
      error: (error, event) => {
        console.error(error, event.query);
      }
    };

    const pgp = pgPromise(initOptions);

    return {
      db: pgp(this._databaseConfiguration.getPostgresConnectionString()),
      pgp
    }

  }
}
