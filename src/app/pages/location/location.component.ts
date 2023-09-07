import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from 'src/app/services/local/local.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  weatherInfo: any = {};

  showToast = false;

  toastMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private localService: LocalService) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params): any => {
      this.weatherInfo = JSON.parse(params['weatherInfo']);
    })
  }

  back() {
    this.router.navigate(['']);
  }

  favourite() {
    const existingFavourites = JSON.parse(this.localService.getData('favourites')!);
    if (existingFavourites && existingFavourites.length < 3) {
      existingFavourites.push({ lat: this.weatherInfo.coord.lat, lon: this.weatherInfo.coord.lon });
      this.localService.saveData('favourites', JSON.stringify(existingFavourites));
      this.toggleToast('Location added to favourites');
    } else if (existingFavourites && existingFavourites.length >= 3) {
      this.toggleToast('Maximum favourites reached');
    } else {
      this.localService.saveData('favourites', JSON.stringify([{ lat: this.weatherInfo.coord.lat, lon: this.weatherInfo.coord.lon }]));
      this.toggleToast('Location added to favourites');
    }
  }

  toggleToast(message: string) {
    this.toastMessage = message
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 2000);
  }
}
