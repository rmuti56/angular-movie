import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/shareds/services/movie.service';
import { AlertService } from 'src/app/shareds/services/alert.service';

@Component({
  selector: 'app-playmovie',
  templateUrl: './playmovie.component.html',
  styleUrls: ['./playmovie.component.css']
})
export class PlaymovieComponent implements OnInit {
  AppURL = AppURL
  movieId: any;
  loadMovie = '';
  constructor(
    private activatedRouter: ActivatedRoute,
    private movie: MovieService,
    private alert: AlertService
  ) {
    this.activatedRouter.params.forEach(param => {
      this.movieId = param.id
    })
    this.initialLoadMovie();
  }

  ngOnInit() {
  }


  initialLoadMovie() {
    this.movie.onLoadMovies(this.movieId).then((result) => {

      this.loadMovie = result;
    }).catch(e => {
      return this.alert.someting_wrong('เกิดข้อผิดพลาด')
    })
  }
}
