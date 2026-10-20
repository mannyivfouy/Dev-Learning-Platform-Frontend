import { Routes } from '@angular/router';
import { ClientLayout } from './layout/client-layout/client-layout';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    component: ClientLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./home/pages/home/home').then((m) => m.Home),
      },
      {
        path: 'courses',
        loadComponent: () =>
          import('./courses/pages/course-list/course-list').then((m) => m.CourseList),
      },
      {
        path: 'courses/:id',
        loadComponent: () =>
          import('./courses/pages/course-detail/course-detail').then((m) => m.CourseDetail),
      },
    ],
  },
];
