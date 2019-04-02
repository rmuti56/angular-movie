import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/shareds/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showLoading = true;
  constructor(
    private alert: AlertService,
    private router: Router,
    private movie: MovieService
  ) {
    this.initailLoadMovie();
  }

  ngOnInit() {
  }
  AppURL = AppURL
  movies

  onPlayMovie(item) {
    this.router.navigate(['', AppURL.PlayMovie, item._id])
  }

  initailLoadMovie() {
    this.movie.onLoadMovies().then((result) => {
      this.movies = result;
      this.showLoading = false;
    }).catch(e => {
      return this.alert.someting_wrong('เกิดข้อผิดพลาด');
    })
  }
}
