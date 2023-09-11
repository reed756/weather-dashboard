import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LocationComponent } from './pages/location/location.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { animation: 'HomeComponent' }
  },
  {
    path: 'location',
    component: LocationComponent,
    data: { animation: 'LocationComponent' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
