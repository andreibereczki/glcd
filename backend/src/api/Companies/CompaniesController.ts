import { Controller, Get, Route, SuccessResponse, Response, Tags, Middlewares, Post, Put, Path } from 'tsoa';
import { inject, injectable } from 'tsyringe';
import { InfrastructureDiType } from '../../infrastructure/infrastructure-di-type';
import { AddCompanyDto, CompanyDto } from '../../infrastructure/repositories/Companies';
import { Repository } from '../../infrastructure/repositories/Companies.interface';
import { StatusCodes } from 'http-status-codes';
import { authMiddleware } from '../../infrastructure/express/middlewares/authMiddleware';
import { z } from 'zod';
import { Body, ValidateBody } from 'infrastructure/zod/validation.decorators';

const CompanySchema = z.object({
  name: z.string(),
  exchange: z.string(),
  ticker: z.string(),
  isin: z.string().length(12, "Inis must be 12 character long").refine((isin: string) => RegExp('^\\D{2}').test(isin), 'Inis must start with 2 letters (non-numeric)'),
  website: z.string().optional(),
});

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

  @SuccessResponse(StatusCodes.CREATED, 'Company created')
  @Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong')
  @Middlewares(authMiddleware)
  @Post()
  @ValidateBody(CompanySchema)
  public async create(@Body() company: AddCompanyDto): Promise<CompanyDto> {
    return await this._companiesRepository.add!(company);
  }

  @SuccessResponse(StatusCodes.OK, 'Company updated')
  @Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong')
  @Middlewares(authMiddleware)
  @Put("{companyId}")
  @ValidateBody(CompanySchema)
  public async update(@Path() companyId: number, @Body() company: AddCompanyDto): Promise<void> {
    await this._companiesRepository.update!(companyId, company);
  }
}
