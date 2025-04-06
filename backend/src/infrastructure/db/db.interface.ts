import { IDatabase } from 'pg-promise';
import { IClient } from 'pg-promise/typescript/pg-subset';
import { Companies } from '../repositories/Companies';

export interface PostgresDatabaseConfiguration {
  getPostgresConnectionString(): string;
}

export interface DBExtensions {
  companies: Companies;
}

export type ExtendedDatabaseProtocol = IDatabase<DBExtensions, IClient> & DBExtensions;
