import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { MovieService } from 'src/app/shareds/services/movie.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-romantic',
  templateUrl: './romantic.component.html',
  styleUrls: ['./romantic.component.css']
})
export class RomanticComponent implements OnInit {
  showLoading = true;
  constructor(
    private alert: AlertService,
    private movie: MovieService,
    private router: Router
  ) {
    this.initailLoadMovie()

  }

  ngOnInit() {
  }
  movies = '';
  AppURL = AppURL;

  onPlayMovie(item) {
    this.router.navigate(['', AppURL.PlayMovie, item._id])
  }

  initailLoadMovie() {
    this.movie.onSearchTypeMovie('โรแมนติก').then((result) => {
      this.movies = result;
      this.showLoading = false;
    }).catch(e => {
      return this.alert.someting_wrong('เกิดข้อผิดพลาด');
    })
  }

}
