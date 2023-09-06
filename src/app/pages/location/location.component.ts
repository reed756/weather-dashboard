import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  weatherInfo: any = {};

  constructor(private route: ActivatedRoute, private router: Router) {

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

}
