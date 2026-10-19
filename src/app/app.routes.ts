import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./client/client.route').then((m) => m.CLIENT_ROUTES),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.route').then((m) => m.ADMIN_ROUTES),
  },
];
