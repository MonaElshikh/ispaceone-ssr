import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherForecastService } from 'Shared/Services/weather-forecast.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {

  constructor(private WeatherForecastS: WeatherForecastService) { }
  WeatherForcastObj = [];
  subscription: Subscription;
  async ngOnInit() {
    this.subscription = (await this.WeatherForecastS.getAll())
      .subscribe((result: any) => {
        if (result) {
          this.WeatherForcastObj = result
        }
      });
  }
}
