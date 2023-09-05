import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { WeatherService } from './weather.service';
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';
import { WeatherData } from '../../models/weather-api-response.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('WeatherService', () => {
  let httpTestingController: HttpTestingController;
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(WeatherService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getWeatherInfo should have getWeather function', () => {
    expect(service.getWeatherInfo).toBeTruthy();
  });

  it('#getWeatherInfo should use GET to retrieve data', () => {
    service.getWeatherInfo().subscribe();

    const testRequest = httpTestingController.expectOne('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=2d5ed2f42a6650224e2a6f20047d7b76');

    expect(testRequest.request.method).toEqual('GET');
  });

})
