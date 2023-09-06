import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from 'src/app/models/weather-api-response.model';
import { environment } from 'src/app/environments/environment';
import { GeoCodeData } from 'src/app/models/geocode-api-response.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  getWeatherInfo(lat: string, lng: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(`${environment.url}?lat=${lat}&lon=${lng}&appid=${environment.api_key}`);
  }

  getGeoCodeData(): Observable<GeoCodeData[]> {
    return this.http.get<GeoCodeData[]>(`${environment.geo_url}?q=London&limit=5&appid=${environment.geo_url}`);
  }
}
