import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { MovieService } from 'src/app/shareds/services/movie.service';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.url';

@Component({
  selector: 'app-europe',
  templateUrl: './europe.component.html',
  styleUrls: ['./europe.component.css']
})
export class EuropeComponent implements OnInit {
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
    this.movie.onSearchMovie('หนังฝรั่ง').then((result) => {
      this.movies = result;
      this.showLoading = false;
    }).catch(e => {
      return this.alert.someting_wrong('เกิดข้อผิดพลาด');
    })
  }

}
