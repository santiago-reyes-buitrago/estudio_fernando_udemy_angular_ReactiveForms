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

  myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required,Validators.minLength(3)]],
    price: [,[Validators.required,Validators.min(100)],],
    inStorage: [,Validators.required,Validators.min(10)]
  })


  isValidFile(fieldName: string):boolean | null {
    return !!this.myForm.controls[fieldName].errors;
  }

  getFieldError(fieldName: string):string | null {
    if (!this.myForm.controls[fieldName]) return null;
    const errors = this.myForm.controls[fieldName].errors ?? {};

    for ( const key of Object.keys(errors)){
      switch (key) {
        case 'minlength':
          return `Este Campo requiere un minimo de ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `Este Campo requiere un minimo de ${errors['min'].min}`;
        case 'required':
          return 'Este campo es requerido';
      }
    }
    return null;
  }
}
