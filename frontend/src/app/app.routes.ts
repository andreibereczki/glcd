import { Routes } from '@angular/router';
import { NotFoundComponent } from './misc/not-found/not-found.component';
import { authenticated } from './authentication/guard/authenticated';
import { LoginComponent } from './authentication/login/login.component';

export const routes: Routes = [
  {
    path: 'companies',
    title: 'Companies',
    loadComponent: () => import('./companies/container/container.component').then(m => m.ContainerComponent),
    loadChildren: () => import('./companies/companies.routes').then(m => m.routes),
    canActivate: [authenticated]
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
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
