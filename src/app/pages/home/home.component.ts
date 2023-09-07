import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import cities from 'cities.json';
import { City } from 'src/app/models/city.model';
import { LocalService } from 'src/app/services/local/local.service';
import { WeatherService } from 'src/app/services/weather/weather.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  weatherForm!: FormGroup;
  searchResults: City[] = [];

  favouriteLocations: any = [];

  citiesArray: any = cities;

  formSubmitted = false;

  constructor(private fb: FormBuilder, private router: Router, private weatherService: WeatherService, private localService: LocalService) {
    this.weatherForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(2)]],
    })
  }

  ngOnInit(): void {
    if (this.weatherForm) {
      this.weatherForm.valueChanges.subscribe((value) => {
        // This callback function will be called whenever the input value changes.
        // You can perform any action you need here.
        if (value.city.length === 0) {
          this.searchResults = [];
          this.formSubmitted = false;
        }
      }
      );
    }
    const existingFavourites = JSON.parse(this.localService.getData('favourites')!);
    if (existingFavourites) {
      existingFavourites.forEach((city: any) => {
        this.weatherService.getWeatherInfo(city.lat, city.lon).subscribe((res) => {
          this.favouriteLocations.push(res);
        })
      })
    }
  }

  viewLocation() {
    this.router.navigate(['location']);
  }

  updateSearchQuery(ev?: any) {
    const searchedCity = this.weatherForm.value.city;
    this.filterSearchQuery(searchedCity);
    this.formSubmitted = true;
  }

  filterSearchQuery(searchedCity: any) {
    this.searchResults = this.citiesArray.filter((city: { name: string; }) => city.name.toLowerCase().includes(searchedCity.toLowerCase()));
  }

  getWeatherDetails(lat: string, lng: string) {
    this.weatherService.getWeatherInfo(lat, lng).subscribe((res) => {
      this.router.navigate(['location'], { queryParams: { weatherInfo: JSON.stringify(res) } });
    })
  }

  deleteFavourite(i: any) {
    this.favouriteLocations.splice(i, 1);
    const existingFavourites = JSON.parse(this.localService.getData('favourites')!);
    existingFavourites.splice(i, 1);
    const updatedFavourites = existingFavourites;
    this.localService.saveData('favourites', JSON.stringify(updatedFavourites));
  }
}
