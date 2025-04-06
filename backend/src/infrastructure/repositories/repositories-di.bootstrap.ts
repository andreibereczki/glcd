import { DependencyContainer, Lifecycle } from 'tsyringe';
import { AddCompanyDto, Companies, CompanyDto } from './Companies';
import { InfrastructureDiType } from '../infrastructure-di-type';
import { Repository } from './Companies.interface';
import { AddUserDto, UserDto, Users } from './Users';

export function repositoriesDiBootstrap(container: DependencyContainer) {
  container.register<Repository<CompanyDto, AddCompanyDto>>(
    InfrastructureDiType.CompaniesRepository,
    { useClass: Companies },
    { lifecycle: Lifecycle.ContainerScoped }
  );

  container.register<Repository<UserDto, AddUserDto>>(
    InfrastructureDiType.UsersRepository,
    { useClass: Users },
    { lifecycle: Lifecycle.ContainerScoped }
  );
}
