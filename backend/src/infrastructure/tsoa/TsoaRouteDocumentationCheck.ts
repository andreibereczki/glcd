import { Result } from "../../../shared";
import { IPrerequisiteCheck } from "../../PrerequisiteChecks";
import * as fs from "fs";
import { injectable } from "tsyringe";

@injectable()
export class TsoaRouteDocumentationCheck implements IPrerequisiteCheck {
  private static readonly _order: number = 4;
  private static readonly _name: string = "Tsoa Routes and Documentation";

  /**
   * Check if tsoa routes and documentation are generated.
   *
   * @inheritdoc
   */
  public async runChecks(): Promise<Result> {
    const routesPath = "../routes/routes.ts";
    const openApiPath = "../openapi/swagger.json";

    if (fs.existsSync(routesPath)) {
      return Result.fail(new Error("Routes are not generated."));
    } else if (fs.existsSync(openApiPath)) {
      return Result.fail(new Error("OpenApi documentation is not generated."));
    }

    return Result.ok();
  }

  public get name(): string {
    return TsoaRouteDocumentationCheck._name;
  }

  public get order(): number {
    return TsoaRouteDocumentationCheck._order;
  }
}
