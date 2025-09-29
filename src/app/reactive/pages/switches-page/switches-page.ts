import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './switches-page.html',
  styleUrl: './switches-page.css'
})
export class SwitchesPage {
  private fb = inject(FormBuilder);
  formutils = FormUtils;

  myForm: FormGroup = this.fb.group({
    gender: ['M',Validators.required],
    wantNotifications: [true],
    termAndConditions: [false,Validators.requiredTrue]
  })

  handleSubmit() {
    console.log(this.myForm.value);
    if (this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
  }
}
