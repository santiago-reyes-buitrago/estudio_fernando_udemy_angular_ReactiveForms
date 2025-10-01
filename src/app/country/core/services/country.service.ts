import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
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
}
