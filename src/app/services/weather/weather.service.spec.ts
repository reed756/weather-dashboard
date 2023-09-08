import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { WeatherData } from '../../models/weather-api-response.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/app/environments/environment';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('weatherService should have getWeather function', () => {
    expect(service.getWeatherInfo).toBeTruthy();
  });

  it('getWeatherInfo should use GET to retrieve data', () => {
    service.getWeatherInfo('44.34', '10.99').subscribe();

    const testRequest = httpMock.expectOne('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=2d5ed2f42a6650224e2a6f20047d7b76');

    expect(testRequest.request.method).toEqual('GET');
  });

  it('should return weather data for the given coordinates', () => {
    const lat = '12.34';
    const lng = '56.78';
    const testData: WeatherData = {
      coord: {
        lon: 56.78,
        lat: 12.34
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d'
        }
      ],
      base: 'stations',
      main: {
        temp: 25.5,
        feels_like: 26,
        pressure: 1012,
        humidity: 45,
        temp_min: 25,
        temp_max: 26
      },
      visibility: 10000,
      wind: {
        speed: 3.1,
        deg: 150
      },
      clouds: {
        all: 0
      },
      dt: 1560350645,
      sys: {
        type: 1,
        id: 5122,
        message: 0.0139,
        country: 'US',
        sunrise: 1560343627,
        sunset: 1560396563
      },
      timezone: -14400,
      id: 0,
      name: 'Sample City',
      cod: 200
    };

    service.getWeatherInfo(lat, lng).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.url}?lat=${lat}&lon=${lng}&appid=${environment.api_key}`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });
})
