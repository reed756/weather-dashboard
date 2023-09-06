import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import cities from 'cities.json';
import { City } from 'src/app/models/city.model';
import { WeatherService } from 'src/app/services/weather/weather.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  weatherForm!: FormGroup;
  searchResults: City[] = [];

  favouriteLocations = [];

  citiesArray: any = cities;

  formSubmitted = false;

  constructor(private fb: FormBuilder, private router: Router, private weatherService: WeatherService) {
    this.weatherForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(2)]],
    })
  }

  ngOnInit(): void {
    if (this.weatherForm) {
      this.weatherForm.valueChanges.subscribe((value) => {
        // This callback function will be called whenever the input value changes.
        console.log('Input Value Changed:', value);
        // You can perform any action you need here.
        if (value.city.length === 0) {
          this.searchResults = [];
          this.formSubmitted = false;
        }
      }
      );
    }
  }

  viewLocation() {
    this.router.navigate(['location']);
  }

  updateSearchQuery(ev?: any) {
    console.log(ev);
    console.log(this.weatherForm.value.city);
    const searchedCity = this.weatherForm.value.city;
    this.filterSearchQuery(searchedCity);
    this.formSubmitted = true;
  }

  filterSearchQuery(searchedCity: any) {
    this.searchResults = this.citiesArray.filter((city: { name: string; }) => city.name.toLowerCase().includes(searchedCity.toLowerCase()));
    console.log(this.searchResults);
  }

  getWeatherDetails(lat: string, lng: string) {
    this.weatherService.getWeatherInfo(lat, lng).subscribe((res) => {
      console.log(res);
      this.router.navigate(['location'], { queryParams: { weatherInfo: JSON.stringify(res) } });
    })
  }
}
