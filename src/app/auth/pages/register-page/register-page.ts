import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;
  myForm = this.fb.group({
    name: ['',Validators.required],
    email: ['',[Validators.required,Validators.email]],
    username: ['',[Validators.required,Validators.minLength(6)]],
    password: ['',[Validators.required,Validators.minLength(6)]],
    confirmPassword: ['',Validators.required]
  })

  handleSubmit() {
    console.log(this.myForm.value);
    if (this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
  }
}
