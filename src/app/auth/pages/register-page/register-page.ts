import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {AbstractControl, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
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
    name: ['',[Validators.required,Validators.pattern(FormUtils.namePattern)]],
    email: ['',[Validators.required,Validators.pattern(FormUtils.emailPattern)],[FormUtils.checkingServerResponse]],
    username: ['',[Validators.required,Validators.minLength(6),Validators.pattern(FormUtils.notOnlySpacesPattern),FormUtils.checkingUser]],
    password: ['',[Validators.required,Validators.minLength(6)]],
    confirmPassword: ['',Validators.required]
  },{validators: [
    this.formUtils.ValidatorConfirmPassword('password','confirmPassword')
    ]})
  handleSubmit() {
    console.log(this.myForm.value);
    if (this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
  }
}
