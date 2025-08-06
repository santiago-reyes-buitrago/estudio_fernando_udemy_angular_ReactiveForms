import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SideMenu} from './shared/components/side-menu/side-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideMenu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = '06-reactive-forms-app';
}
