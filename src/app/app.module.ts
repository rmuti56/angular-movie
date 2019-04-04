import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedsModule } from './shareds/shareds.module';
import { HomeComponent } from './components/home/home.component';
import { HotComponent } from './components/hot/hot.component';
import { AsiaComponent } from './components/asia/asia.component';
import { EuropeComponent } from './components/europe/europe.component';
import { PopularComponent } from './components/popular/popular.component';
import { ActionComponent } from './components/action/action.component';
import { AdventureComponent } from './components/adventure/adventure.component';
import { CartoonComponent } from './components/cartoon/cartoon.component';
import { FunnyComponent } from './components/funny/funny.component';
import { ReallifeComponent } from './components/reallife/reallife.component';
import { CrimeComponent } from './components/crime/crime.component';
import { FamilyComponent } from './components/family/family.component';
import { FairytaleComponent } from './components/fairytale/fairytale.component';
import { HistoricalComponent } from './components/historical/historical.component';
import { HorrorComponent } from './components/horror/horror.component';
import { InvestigationComponent } from './components/investigation/investigation.component';
import { WarComponent } from './components/war/war.component';
import { RomanticComponent } from './components/romantic/romantic.component';
import { SportComponent } from './components/sport/sport.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http'
import { PornComponent } from './components/porn/porn.component';
import { PlaymovieComponent } from './components/playmovie/playmovie.component';
import { UrlPipe } from './url.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HotComponent,
    AsiaComponent,
    EuropeComponent,
    PopularComponent,
    ActionComponent,
    AdventureComponent,
    CartoonComponent,
    FunnyComponent,
    ReallifeComponent,
    CrimeComponent,
    FamilyComponent,
    FairytaleComponent,
    HistoricalComponent,
    HorrorComponent,
    InvestigationComponent,
    WarComponent,
    RomanticComponent,
    SportComponent,
    LoginComponent,
    PornComponent,
    PlaymovieComponent,
    UrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
