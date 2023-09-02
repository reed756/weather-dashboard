import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  weatherForm!: FormGroup;

  searchQuery = '';

  favouriteLocations = ['London', 'Paris', 'Berlin'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.weatherForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(2)]],
    })
  }

  viewLocation() {
    this.router.navigate(['location']);
  }

}
