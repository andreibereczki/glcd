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

  @SuccessResponse(StatusCodes.OK, 'Get company record by Id')
  @Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong')
  @Middlewares(authMiddleware)
  @Get("id/{companyId}")
  public async getById(@Path() companyId: number): Promise<CompanyDto | null> {
    const company = await this._companiesRepository.getByField!({
      id: companyId
    });

    if (company === null) {
      this.setStatus(StatusCodes.NOT_FOUND);
      return null;
    }

    return company;
  }

  @SuccessResponse(StatusCodes.OK, 'Get company record by ISIN')
  @Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong')
  @Middlewares(authMiddleware)
  @Get("isin/{companyIsin}")
  public async getByIsin(@Path() companyIsin: string): Promise<CompanyDto | null> {
    const company = await this._companiesRepository.getByField!({
      isin: companyIsin
    });

    if (company === null) {
      this.setStatus(StatusCodes.NOT_FOUND);
      return null;
    }

    return company;
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
