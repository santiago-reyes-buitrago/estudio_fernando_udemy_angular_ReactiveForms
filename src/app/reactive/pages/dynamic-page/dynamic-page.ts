import { Component } from '@angular/core';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-dynamic-page',
  imports: [
    JsonPipe
  ],
  templateUrl: './dynamic-page.html',
  styleUrl: './dynamic-page.css'
})
export class DynamicPage {

}
