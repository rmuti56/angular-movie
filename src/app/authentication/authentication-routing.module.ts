import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthURL } from './authentication.url';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { SettingComponent } from './components/setting/setting.component';

const routes: Routes = [
  { path: '', redirectTo: AuthURL.AddMovie, pathMatch: 'full' },
  { path: AuthURL.AddMovie, component: AddMovieComponent },
  { path: AuthURL.Setting, component: SettingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
