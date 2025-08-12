import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './dynamic-page.html',
  styleUrl: './dynamic-page.css'
})
export class DynamicPage {
  private fb = inject(FormBuilder);

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required,Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Metal Gear', Validators.required],
        ['Death Stranding', Validators.required],
      ]
    ,Validators.minLength(3)),
  })

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

}
