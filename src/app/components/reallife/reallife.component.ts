import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { MovieService } from 'src/app/shareds/services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reallife',
  templateUrl: './reallife.component.html',
  styleUrls: ['./reallife.component.css']
})
export class ReallifeComponent implements OnInit {
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
    this.movie.onSearchTypeMovie('ชีวิตจริง').then((result) => {
      this.movies = result;
      this.showLoading = false;
    }).catch(e => {
      return this.alert.someting_wrong('เกิดข้อผิดพลาด');
    })
  }
}
