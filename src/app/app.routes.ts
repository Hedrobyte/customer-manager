import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./customer-manager/customer-manager.component')
    },
    {
        path: 'new',
        loadComponent: () => import('./customer-form/customer-form.component')
    },
    {
        path: ':id/edit',
        loadComponent: () => import('./customer-form/customer-form.component')
    }
];
