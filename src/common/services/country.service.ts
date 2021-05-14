import { Injectable } from '@angular/core';
import { codes } from 'iso-country-codes';
import { COUNTRIES } from '../models/Countries/countries';

@Injectable({
	providedIn: 'root'
})
export class CountryService {
	constructor() {}

	getCountryList() {
		return codes;
	}

	getCodeByCountry(countryName: string): string {
		codes.forEach(country =>{
			if (country.name === countryName){
				return country.alpha2;
			}
		})
		return '';
	}

	getCountryByCode(countryCode: string): string {
		const pais = COUNTRIES.find((country) => country.code === countryCode);
		if (pais) {
			return <string> pais.name;
		} else {
			return countryCode;
		}
	}
}
