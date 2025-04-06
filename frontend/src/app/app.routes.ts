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
    path: '',
    title: 'Companies',
    loadComponent: () => import('./companies/container/container.component').then(m => m.ContainerComponent),
    loadChildren: () => import('./companies/companies.routes').then(m => m.routes)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
