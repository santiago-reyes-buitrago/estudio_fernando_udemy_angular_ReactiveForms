import {Routes} from '@angular/router';
import {BasicPage} from './pages/basic-page/basic-page';
import {DynamicPage} from './pages/dynamic-page/dynamic-page';
import {SwitchesPage} from './pages/switches-page/switches-page';


export  const countryRoutes:Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Basicos',
        component: BasicPage,
      },
      {
        path: 'dynamic',
        title: 'Dinamicos',
        component: DynamicPage,
      },
      {
        path: 'switches',
        title: 'Switches',
        component: SwitchesPage,
      },
      {
        path: '**',
        redirectTo: 'basic'
      }
    ]
  }
]
