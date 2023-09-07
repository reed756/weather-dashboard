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

  constructor(private route: ActivatedRoute, private router: Router, private localService: LocalService) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params): any => {
      console.log(JSON.parse(params['weatherInfo']));
      this.weatherInfo = JSON.parse(params['weatherInfo']);
    })
  }

  back() {
    this.router.navigate(['']);
  }

  favourite() {
    const existingFavourites = JSON.parse(this.localService.getData('favourites')!);
    if (existingFavourites) {
      existingFavourites.push({ lat: this.weatherInfo.coord.lat, lon: this.weatherInfo.coord.lon });
      console.log(existingFavourites);
      this.localService.saveData('favourites', JSON.stringify(existingFavourites));
    } else {
      this.localService.saveData('favourites', JSON.stringify([{ lat: this.weatherInfo.coord.lat, lon: this.weatherInfo.coord.lon }]));
    }
  }
}
