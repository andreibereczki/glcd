import { inject, injectable } from 'tsyringe';
import { ExtendedDatabaseProtocol } from '../db/db.interface';
import { IMain } from 'pg-promise';
import { Repository } from './Companies.interface';
import { InfrastructureDiType } from '../infrastructure-di-type';

export interface AddCompanyDto {
  name: string;
  exchange: string;
  ticker: string;
  isin: string;
  website: string | null;
}

export interface CompanyDto extends AddCompanyDto {
  id: number;
}

@injectable()
export class Companies implements Repository<CompanyDto, AddCompanyDto> {
  constructor(
    @inject(InfrastructureDiType.DatabaseInstance) private readonly _db: ExtendedDatabaseProtocol,
    @inject(InfrastructureDiType.DatabaseInstanceHelper) private readonly _pgp: IMain
  ) {}

  public async getAll() {
    return this._db.manyOrNone<CompanyDto>('SELECT * FROM companies');
  }

  public async add(company: AddCompanyDto): Promise<CompanyDto> {
    const columnSet = new this._pgp.helpers.ColumnSet(company, { table: 'companies' });
    const query = this._pgp.helpers.insert(company, columnSet) + ' returning *';

    return this._db.one<CompanyDto>(query);
  }

  public async update(id: number, company: AddCompanyDto): Promise<void> {
    const columnSet = new this._pgp.helpers.ColumnSet(company, { table: 'companies' });
    const query = this._pgp.helpers.update(company, columnSet) + ' WHERE id = $1';

    await this._db.oneOrNone<CompanyDto>(query, [id]);
  }

  public async getByField(fields: Record<string, unknown>): Promise<CompanyDto | null> {
    let query = 'SELECT * FROM companies WHERE ';
    const queryParams: unknown[] = [];

    Object.keys(fields).forEach((field, index) => {
      query += `${field} = $${index + 1} `;
      queryParams.push(fields[field]);
    });

    return this._db.oneOrNone<CompanyDto>(query, queryParams);
  }
}
