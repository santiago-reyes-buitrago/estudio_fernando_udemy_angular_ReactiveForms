import {Routes} from '@angular/router';
import {RegisterPage} from './pages/register-page/register-page';

export  const authRoutes:Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-up',
        component: RegisterPage
      },
      {
        path: '**',
        redirectTo: 'sign-up',
      }
    ]
  }
]
