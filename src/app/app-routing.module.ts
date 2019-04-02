import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppURL } from './app.url';
import { HomeComponent } from './components/home/home.component';
import { ActionComponent } from './components/action/action.component';
import { WarComponent } from './components/war/war.component';
import { SportComponent } from './components/sport/sport.component';
import { ReallifeComponent } from './components/reallife/reallife.component';
import { PopularComponent } from './components/popular/popular.component';
import { InvestigationComponent } from './components/investigation/investigation.component';
import { HorrorComponent } from './components/horror/horror.component';
import { HotComponent } from './components/hot/hot.component';
import { HistoricalComponent } from './components/historical/historical.component';
import { FunnyComponent } from './components/funny/funny.component';
import { FamilyComponent } from './components/family/family.component';
import { FairytaleComponent } from './components/fairytale/fairytale.component';
import { EuropeComponent } from './components/europe/europe.component';
import { CrimeComponent } from './components/crime/crime.component';
import { CartoonComponent } from './components/cartoon/cartoon.component';
import { AsiaComponent } from './components/asia/asia.component';
import { AdventureComponent } from './components/adventure/adventure.component';
import { RomanticComponent } from './components/romantic/romantic.component';
import { LoginComponent } from './components/login/login.component';
import { PornComponent } from './components/porn/porn.component';
import { PlaymovieComponent } from './components/playmovie/playmovie.component';

const routes: Routes = [
  { path: '', redirectTo: AppURL.Home, pathMatch: 'full' },
  { path: AppURL.Home, component: HomeComponent },
  { path: AppURL.Action, component: ActionComponent },
  { path: AppURL.Adventure, component: AdventureComponent },
  { path: AppURL.Asia, component: AsiaComponent },
  { path: AppURL.Cartoon, component: CartoonComponent },
  { path: AppURL.Crime, component: CrimeComponent },
  { path: AppURL.Europe, component: EuropeComponent },
  { path: AppURL.Fairytale, component: FairytaleComponent },
  { path: AppURL.Family, component: FamilyComponent },
  { path: AppURL.Funny, component: FunnyComponent },
  { path: AppURL.Historical, component: HistoricalComponent },
  { path: AppURL.Horror, component: HorrorComponent },
  { path: AppURL.Hot, component: HotComponent },
  { path: AppURL.Investigation, component: InvestigationComponent },
  { path: AppURL.Popular, component: PopularComponent },
  { path: AppURL.Porn, component: PornComponent },
  { path: AppURL.Reallife, component: ReallifeComponent },
  { path: AppURL.Romantic, component: RomanticComponent },
  { path: AppURL.Sport, component: SportComponent },
  { path: AppURL.War, component: WarComponent },
  { path: AppURL.Login, component: LoginComponent },
  { path: AppURL.PlayMovie + '/:id', component: PlaymovieComponent },
  { path: AppURL.Auth, loadChildren: './authentication/authentication.module#AuthenticationModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
