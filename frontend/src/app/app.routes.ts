import { Routes } from '@angular/router';
import { NotFoundComponent } from './misc/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'companies',
    title: 'Companies',
    loadComponent: () => import('./companies/container/container.component').then(m => m.ContainerComponent),
    loadChildren: () => import('./companies/companies.routes').then(m => m.routes)
  },
  {
    path: '404',
    title: 'Error 404 - Ressource Not Found',
    component: NotFoundComponent
  },
  {
    path: '',
    title: 'Companies',
    loadComponent: () => import('./companies/container/container.component').then(m => m.ContainerComponent),
    loadChildren: () => import('./companies/companies.routes').then(m => m.routes)
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
