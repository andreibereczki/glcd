import { Routes } from '@angular/router';
import { NotFoundComponent } from './misc/not-found/not-found.component';
import { authenticatedGuard } from './authentication/guards/authenticated.guard';
import { notAuthenticatedGuard } from './authentication/guards/not-authenticated.guard';
import { LoginComponent } from './authentication/login/login.component';
import { CompaniesDataProviderService } from './companies/companies.data-provider.service';

export const routes: Routes = [
  {
    path: 'companies',
    title: 'Companies',
    loadComponent: () => import('./companies/container/container.component').then(m => m.ContainerComponent),
    loadChildren: () => import('./companies/companies.routes').then(m => m.routes),
    canActivate: [authenticatedGuard],
    providers: [CompaniesDataProviderService],
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
    canActivate: [notAuthenticatedGuard]
  },
  {
    path: '404',
    title: 'Error 404 - Resource Not Found',
    component: NotFoundComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'companies'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
