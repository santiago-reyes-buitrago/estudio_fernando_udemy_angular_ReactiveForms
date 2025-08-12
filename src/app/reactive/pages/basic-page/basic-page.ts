import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '../../../utils/form-utils';

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
  private fb = inject(FormBuilder)
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required,Validators.minLength(3)]],
    price: ['',[Validators.required,Validators.min(100)],],
    inStorage: ['',[Validators.required,Validators.min(10)]]
  })

  handleSubmit() {
    if (this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset({
      price: 0,
      inStorage: 0
    });
  }
}
