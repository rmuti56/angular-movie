import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { SettingComponent } from './components/setting/setting.component';
import { SharedsModule } from '../shareds/shareds.module';

@NgModule({
  declarations: [AddMovieComponent, SettingComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedsModule
  ]
})
export class AuthenticationModule { }
