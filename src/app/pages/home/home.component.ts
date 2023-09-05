import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import cities from 'cities.json';
import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city/city.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  weatherForm!: FormGroup;

  searchQuery = '';
  searchResults: City[] = [];

  favouriteLocations = ['London', 'Paris', 'Berlin'];

  citiesArray: any = cities;

  constructor(private fb: FormBuilder, private router: Router, private cityService: CityService) {
    this.weatherForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(2)]],
    })
  }

  viewLocation() {
    this.router.navigate(['location']);
  }

  updateSearchQuery(ev?: any) {
    console.log(ev);
    console.log(this.weatherForm.value.city);
    const searchedCity = this.weatherForm.value.city;
    this.filterSearchQuery(searchedCity);
  }

  filterSearchQuery(searchedCity: any) {
    this.searchResults = this.citiesArray.filter((city: { name: string; }) => city.name.toLowerCase().includes(searchedCity.toLowerCase()));
    console.log(this.searchResults);
  }


}
