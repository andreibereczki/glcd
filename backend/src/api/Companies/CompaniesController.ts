import { Controller, Get, Route, SuccessResponse, Response, Tags } from 'tsoa';
import { inject, injectable } from 'tsyringe';
import { InfrastructureDiType } from '../../infrastructure/infrastructure-di-type';
import { AddCompanyDto, CompanyDto } from '../../infrastructure/repositories/Companies';
import { Repository } from '../../infrastructure/repositories/Companies.interface';
import { StatusCodes } from 'http-status-codes';

@injectable()
@Route('companies')
@Tags('Companies')
export class CompaniesController extends Controller {
  constructor(
    @inject(InfrastructureDiType.CompaniesRepository)private readonly _companyRepository: Repository<CompanyDto, AddCompanyDto>
  ) {
    super();
  }

  @SuccessResponse(StatusCodes.OK, 'Get all company records')
  @Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong')
  @Get()
  public async getAll(): Promise<CompanyDto[]> {
    return await this._companyRepository.getAll();
  }
}
