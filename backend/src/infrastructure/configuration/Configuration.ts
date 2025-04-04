import { name as microserviceName } from "../../../package.json";
import process from "process";
import { injectable } from "tsyringe";
import { PostgresDatabaseConfiguration } from '../db/db.interface';
import { ExpressConfig } from '../express/express.interface';

@injectable()
export class Configuration implements PostgresDatabaseConfiguration, ExpressConfig {
  public getMicroserviceName(): string {
    if (microserviceName != null) {
      return microserviceName;
    }

    throw new Error("Microservice name not set in package.json");
  }

  public getPort(): number {
    return this.getRequiredNumberEnvVariable("PORT");
  }

  public getPostgresConnectionString(): string {
    const username = this.getRequiredEnvVariable("DB_USER");
    const password = this.getRequiredEnvVariable("DB_PASSWORD");
    const host = this.getRequiredEnvVariable("DB_HOST");
    const database = this.getRequiredEnvVariable("DB_DATABASE");

    return `postgres://${username}:${password}@${host}/${database}`;
  }

  private getRequiredEnvVariable(envVarName: string): string {
    const envVar = process.env[envVarName];
    if (envVar === undefined) {
      throw this.envVariableNotSetError(envVarName);
    }
    return envVar;
  }

  private getRequiredNumberEnvVariable(envVarName: string): number {
    const envVar = this.getRequiredEnvVariable(envVarName);
    if (isNaN(Number(envVar))) {
      throw new Error(`Environment variable '${envVarName}' should be a number`);
    }
    return Number(envVar);
  }

  private envVariableNotSetError(envVarName: string): Error {
    return new Error(`Environment variable '${envVarName}' is not set`);
  }
}
