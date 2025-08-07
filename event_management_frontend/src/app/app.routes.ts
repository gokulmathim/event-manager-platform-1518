import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'events' },
      { path: 'events', loadComponent: () => import('./pages/event-list/event-list.component').then(m => m.EventListComponent) },
      { path: 'events/:id', loadComponent: () => import('./pages/event-detail/event-detail.component').then(m => m.EventDetailComponent) },
      { path: 'create', loadComponent: () => import('./pages/event-create/event-create.component').then(m => m.EventCreateComponent) },
      { path: 'edit/:id', loadComponent: () => import('./pages/event-edit/event-edit.component').then(m => m.EventEditComponent) },
      { path: 'dashboard', loadComponent: () => import('./pages/organizer-dashboard/organizer-dashboard.component').then(m => m.OrganizerDashboardComponent) },
      { path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) },
      { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) }
    ]
  },
  { path: '**', redirectTo: '' }
];
