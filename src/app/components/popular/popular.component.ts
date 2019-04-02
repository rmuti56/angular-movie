import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/shareds/services/movie.service';
import { AppURL } from 'src/app/app.url';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
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
    this.movie.onSearchMovie('ยอดนิยม').then((result) => {
      this.movies = result;
      this.showLoading = false;
    }).catch(e => {
      return this.alert.someting_wrong('เกิดข้อผิดพลาด');
    })
  }

}
