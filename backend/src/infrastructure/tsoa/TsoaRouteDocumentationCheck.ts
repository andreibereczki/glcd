import * as fs from "fs";
import { PrerequisiteCheck, PrerequisiteCheckResult } from 'infrastructure/prerequisite-check.interface';
import { injectable } from "tsyringe";

@injectable()
export class TsoaRouteDocumentationCheck implements PrerequisiteCheck {
  private static readonly _order: number = 2;

  public async runChecks(): Promise<PrerequisiteCheckResult> {
    const routesPath = "./build/routes/routes.ts";
    const openApiPath = "./build/openapi/swagger.json";
    const result: PrerequisiteCheckResult = {
      isSuccess: false
    };

    if (!fs.existsSync(routesPath)) {
      result.error = new Error("Routes are not generated.");
      return result;
    }

    if (!fs.existsSync(openApiPath)) {
      result.error = new Error("OpenApi documentation is not generated.");
      return result;
    }

    result.isSuccess = true;

    return result;
  }

  public get order(): number {
    return TsoaRouteDocumentationCheck._order;
  }
}
