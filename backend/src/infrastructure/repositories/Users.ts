import { inject, injectable } from 'tsyringe';
import { Repository } from './Companies.interface';
import { InfrastructureDiType } from '../infrastructure-di-type';
import { ExtendedDatabaseProtocol } from '../db/db.interface';

export interface AddUserDto {
  username: string;
  password: string;
}

export interface UserDto extends AddUserDto {
  id: number;
}

@injectable()
export class Users implements Repository<UserDto, AddUserDto> {
  constructor(
    @inject(InfrastructureDiType.DatabaseInstance) private readonly _db: ExtendedDatabaseProtocol
  ) {}

  public async getByField(fields: Record<string, unknown>): Promise<UserDto | null> {
    let query = 'SELECT * FROM users WHERE ';
    const queryParams: unknown[] = [];

    Object.keys(fields).forEach((field, index) => {
      query += `${field} = $${index + 1} `;
      queryParams.push(fields[field]);
    });

    return this._db.oneOrNone<UserDto>(query, queryParams);
  }
}
