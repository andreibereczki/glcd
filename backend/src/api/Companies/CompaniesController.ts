import { Controller, Get, Route, SuccessResponse, Response, Tags, Middlewares, Body, Post, Put, Path } from 'tsoa';
import { inject, injectable } from 'tsyringe';
import { InfrastructureDiType } from '../../infrastructure/infrastructure-di-type';
import { AddCompanyDto, CompanyDto } from '../../infrastructure/repositories/Companies';
import { Repository } from '../../infrastructure/repositories/Companies.interface';
import { StatusCodes } from 'http-status-codes';
import { authMiddleware } from '../../infrastructure/express/middlewares/authMiddleware';

@injectable()
@Route('companies')
@Tags('Companies')
export class CompaniesController extends Controller {
  constructor(
    @inject(InfrastructureDiType.CompaniesRepository)private readonly _companiesRepository: Repository<CompanyDto, AddCompanyDto>
  ) {
    super();
  }

  @SuccessResponse(StatusCodes.OK, 'Get all company records')
  @Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong')
  @Middlewares(authMiddleware)
  @Get()
  public async getAll(): Promise<CompanyDto[]> {
    return await this._companiesRepository.getAll!();
  }

  @SuccessResponse(StatusCodes.OK, 'Create new company record')
  @Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong')
  @Middlewares(authMiddleware)
  @Post()
  public async create(@Body() company: AddCompanyDto): Promise<CompanyDto> {
    return await this._companiesRepository.add!(company);
  }

  @SuccessResponse(StatusCodes.OK, 'Update a company records')
  @Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong')
  @Middlewares(authMiddleware)
  @Put("{companyId}")
  public async update(@Path() companyId: number, @Body() company: AddCompanyDto): Promise<void> {
    await this._companiesRepository.update!(companyId, company);
  }
}
