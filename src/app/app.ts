import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SideMenu} from './shared/components/side-menu/side-menu';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideMenu, TitleCasePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'reactive-forms-app';
}
