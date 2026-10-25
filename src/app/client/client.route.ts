import { Routes } from '@angular/router';
import { ClientLayout } from './layout/client-layout/client-layout';
import { authGuard } from '../core/guards/auth-guard';

export const CLIENT_ROUTES: Routes = [
  // Auth pages
  {
    path: 'login',
    loadComponent: () => import('./auth/auth-layout/auth-layout').then((m) => m.AuthLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./auth/pages/login/login').then((m) => m.Login),
      },
    ],
  },

  {
    path: 'register',
    loadComponent: () => import('./auth/auth-layout/auth-layout').then((m) => m.AuthLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./auth/pages/register/register').then((m) => m.Register),
      },
    ],
  },

  // Learning page
  {
    path: 'courses/:courseId/learn/:lessonId',
    canActivate: [authGuard],
    loadComponent: () => import('./learning/pages/learn/learn').then((m) => m.Learn),
  },

  // Public pages
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
      {
        path: 'pricing',
        loadComponent: () => import('./pricing/pages/pricing/pricing').then((m) => m.Pricing)
      },

      // Student pages
      {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./dashboard/pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'my-courses',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./my-courses/pages/my-courses/my-courses').then((m) => m.MyCourses),
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () => import('./profile/pages/profile/profile').then((m) => m.Profile),
      },
    ],
  },
];
