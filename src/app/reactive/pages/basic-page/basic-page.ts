import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './basic-page.html',
  styleUrl: './basic-page.css'
})
export class BasicPage {
  // myForm = new FormGroup({
  //   name: new FormControl<string>(''),
  //   price: new FormControl<number>(0),
  //   inStorage: new FormControl<number>(0)
  // })
  private fb = inject(FormBuilder)

  myForm = this.fb.group({
    name: ['',[Validators.required,Validators.minLength(3)]],
    price: [,[Validators.required,Validators.min(10)],],
    inStorage: [,Validators.required,Validators.min(0)]
  })
}
