import { Configuration } from "./Configuration";
import { inject, injectable } from "tsyringe";
import { PrerequisiteCheck, PrerequisiteCheckResult } from '../prerequisite-check.interface';
import { InfrastructureDiType } from '../infrastructure-di-type';

@injectable()
export class ConfigurationCheck implements PrerequisiteCheck {
  private static readonly _order: number = 0;

  private readonly _configuration: Configuration;

  public constructor(@inject(InfrastructureDiType.Configuration) config: Configuration) {
    this._configuration = config;
  }

  public runChecks() {
    const result: PrerequisiteCheckResult = {
      isSuccess: false
    };
    try {
      this._configuration.getMicroserviceName();
      this._configuration.getPort();
      this._configuration.getPostgresConnectionString();

      result.isSuccess = true;

      return result;
    } catch (error: any) {
      result.error = error;
      return result;
    }
  }

  public get order(): number {
    return ConfigurationCheck._order;
  }
}
