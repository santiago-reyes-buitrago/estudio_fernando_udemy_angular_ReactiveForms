import { Component } from '@angular/core';
import reactiveRoutes from '../../../reactive/reactive.routes';
import {RouterLink, RouterLinkActive} from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
}

const reactiveRoute = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'side-menu',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css'
})
export class SideMenu {
  reactiveItems: MenuItem[] = reactiveRoute
    .filter(item => item.path !== '**')
    .map(item => ({
    route: `reactive/${item.path}`,
    title:  `${item.title}`,
  }));


  authMenu:MenuItem[] = [{
    title: 'Registro', route: 'auth/sign-up'
  }]

  countryMenu:MenuItem[] = [{
    title: 'Paises', route: 'country/'
  }]
}
