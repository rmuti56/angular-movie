import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/shareds/services/movie.service';
import { AuthURL } from 'src/app/authentication/authentication.url';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showLoading = true;
  showLoadingDelete = true;
  constructor(
    private alert: AlertService,
    private router: Router,
    private movie: MovieService,
    private auth: AuthenService,
    private account: AccountService
  ) {
    this.initailLoadMovie();
  }

  ngOnInit() {
  }
  AppURL = AppURL;
  AuthURL = AuthURL
  movies;
  Auth = false;



  //เปิดหนังในหน้าใหม่
  onPlayMovie(item) {
    this.router.navigate(['', AppURL.PlayMovie, item._id])
  }

  onEditMovie(item) {
    this.router.navigate(['', AppURL.Auth, AuthURL.AddMovie, item._id])
  }

  onDeleteMovie(item) {
    this.alert.confirm('ต้องการลบหนังใช่หรือไม่').then((status) => {
      if (!status) return
      this.showLoadingDelete = true;
      this.account.onDeleteMovei(item._id, item.idImageUpload, item.idVideoUpload)
        .then((result) => {
          this.showLoadingDelete = false;
          this.alert.notify('ลบหนังสำเร็จ')
          this.initailLoadMovie();
        })
        .catch(e => {
          this.showLoadingDelete = false;
          return this.alert.someting_wrong('เกิดข้อผิดพลาด');
        })
    })

  }

  initailLoadMovie() {
    if (this.auth.getAuthenticated()) {
      this.Auth = true
    }
    this.movie.onLoadMovies().then((result) => {
      this.movies = result;
      this.showLoading = false;

    }).catch(e => {
      this.showLoading = false;
      return this.alert.someting_wrong('เกิดข้อผิดพลาด');
    })
  }
}
