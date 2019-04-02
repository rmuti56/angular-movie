import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/shareds/services/movie.service';
import { AlertService } from 'src/app/shareds/services/alert.service';

@Component({
  selector: 'app-funny',
  templateUrl: './funny.component.html',
  styleUrls: ['./funny.component.css']
})
export class FunnyComponent implements OnInit {
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
    this.movie.onSearchTypeMovie('ตลก').then((result) => {
      this.movies = result;
      this.showLoading = false;

    }).catch(e => {
      return this.alert.someting_wrong('เกิดข้อผิดพลาด');
    })
  }
}
