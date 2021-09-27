import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { DataService } from './data.service';
import { LocalstorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService extends  DataService {
  constructor(http: HttpClient, private _http: HttpClient,localStorage:LocalstorageService) {
    super(http, environment.BASE_URL + "/WeatherForecast",localStorage);
  }
}
