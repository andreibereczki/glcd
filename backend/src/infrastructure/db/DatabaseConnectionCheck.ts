import { inject, injectable } from "tsyringe";
import { InfrastructureDiType } from '../infrastructure-di-type';
import { ExtendedDatabaseProtocol } from './db.interface';
import { PrerequisiteCheck, PrerequisiteCheckResult } from '../prerequisite-check.interface';

export interface HealthCheck {
  runChecks(): Promise<PrerequisiteCheckResult>;
}

@injectable()
export class DatabaseConnectionCheck implements HealthCheck, PrerequisiteCheck {
  private static readonly _order: number = 1;

  public constructor(@inject(InfrastructureDiType.DatabaseInstance) private readonly _db: ExtendedDatabaseProtocol) {}

  public async runChecks(): Promise<PrerequisiteCheckResult> {
    const result: PrerequisiteCheckResult = {
      isSuccess: false
    };

    try {
      await this.checkConnectionStatus();
      result.isSuccess = true;
      return result;
    } catch (error: any) {
      result.error = error;
      return result;
    }
  }

  public get order(): number {
    return DatabaseConnectionCheck._order;
  }

  private async checkConnectionStatus(): Promise<void> {
    try {
      const result = await this._db.query('SELECT 1;');
      console.log(`Postgres database connection has been established successfully and the rowCount for Select query is: ${result.length}`);
    } catch (e: any) {
      console.error(`Failed to connect to the database due to the reason: ${e.stack}`);
      throw e;
    }
  }
}
