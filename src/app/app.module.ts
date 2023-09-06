import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';
import { LocationComponent } from './pages/location/location.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherService } from './services/weather/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { DirectionPipe } from './pipes/direction.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    DirectionPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
