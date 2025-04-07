import { Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

export const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'list',
    component: ListComponent,
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
