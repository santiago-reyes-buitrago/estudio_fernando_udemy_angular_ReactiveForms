import {Component, effect, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {CountryService} from '../../core/services/country.service';
import {CountryInterface} from '../../core/interfaces/country.interface';
import {filter, switchMap, tap} from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './country-page.html',
  styleUrl: './country-page.css'
})
export class CountryPage {
  private fb = inject(FormBuilder);
  private countryService = inject(CountryService);

  regions = signal(this.countryService.regions)
  countryByRegion = signal<CountryInterface[]>([])
  borders = signal<CountryInterface[]>([])

  onFormChanged = effect((onCleanup) => {
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();
    onCleanup(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
      console.log('cleanup');
    })
  })

  onRegionChanged() {
    return this.myFormCountry.get('region')!.valueChanges.pipe(
      tap(() => this.myFormCountry.patchValue({country: '', border: ''})),
      switchMap(region => this.countryService.getCountriesByRegion(region!)),
    )
      .subscribe(countries => {
        this.countryByRegion.set(countries);
      })
  }

  onCountryChanged() {
    return this.myFormCountry.get('country')!.valueChanges.pipe(
      tap(() => this.myFormCountry.patchValue({border: ''})),
      filter(alphaCode => alphaCode!.length > 0),
      switchMap(alphaCode => this.countryService.getCountryByAlphaCode(alphaCode!)),
      switchMap(country => this.countryService.getCountryNamesByCodeArray(country.borders!)),
    )
      .subscribe(countries => {
        this.borders.set(countries);
      })
  }

  myFormCountry = this.fb.group({
    region: ['',Validators.required],
    country: ['',Validators.required],
    border: ['',Validators.required]
  })



}
