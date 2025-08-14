import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '../../../utils/form-utils';

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
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required,Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Metal Gear', Validators.required],
        ['Death Stranding', Validators.required],
      ]
    ,Validators.minLength(2)
    ),
  })

  newFavoriteGame = this.fb.control('',Validators.required)

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }


  onAddToFavorites() {
    if (this.newFavoriteGame.invalid) return;
    const newFame = this.newFavoriteGame.value;
    this.favoriteGames.push(this.fb.control(newFame, [Validators.required]));
    this.newFavoriteGame.reset();
  }

  onRemoveFromFavorites(index: number) {
    this.favoriteGames.removeAt(index);
  }
}
