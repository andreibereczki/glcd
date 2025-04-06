import { DependencyContainer, Lifecycle } from 'tsyringe';
import { AddCompanyDto, Companies, CompanyDto } from './Companies';
import { InfrastructureDiType } from '../infrastructure-di-type';
import { Repository } from './Companies.interface';

export function repositoriesDiBootstrap(container: DependencyContainer) {
  container.register<Repository<CompanyDto, AddCompanyDto>>(
    InfrastructureDiType.CompaniesRepository,
    { useClass: Companies },
    { lifecycle: Lifecycle.ContainerScoped }
  );
}
