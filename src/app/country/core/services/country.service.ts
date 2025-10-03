import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, Observable, of} from 'rxjs';
import {CountryInterface} from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/';
  private http = inject(HttpClient)
  // private apiUrl = 'https://restcountries.com/v3.1/region/americas?fields=cca3,name,borders';

  private _regions = ['Africa','Americas','Asia','Europe','Oceania'];

  get regions() {
    return [...this._regions];
  }

  getCountriesByRegion(region: string):Observable<CountryInterface[]> {
    if (!region) return of([]);
    const url = `${this.apiUrl}region/${region}?fields=cca3,name,borders`
    return this.http.get<CountryInterface[]>(url);
  }

  getCountryByAlphaCode(alphaCode: string):Observable<CountryInterface> {
    const url = `${this.apiUrl}alpha/${alphaCode}?fields=cca3,name,borders`
    return this.http.get<CountryInterface>(url);
  }

  getCountryNamesByCodeArray(countryCodes: string[]):Observable<CountryInterface[]> {
    if (!countryCodes) return of([]);
    const countriesRequests: Observable<CountryInterface>[] = countryCodes.map((code) => this.getCountryByAlphaCode(code)) ?? [];
    return combineLatest(countriesRequests);
  }
}
