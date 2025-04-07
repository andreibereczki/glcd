import { Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { companiesResolver } from './companies.resolver';

export const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
    title: 'Create a new Company',
  },
  {
    path: 'list',
    component: ListComponent,
    title: 'Companies Listing',
    resolve: {
      companies: companiesResolver
    }
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  }
];
