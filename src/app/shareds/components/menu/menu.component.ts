import { Component, OnInit, SimpleChanges, } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthURL } from 'src/app/authentication/authentication.url';
import { AuthenService } from 'src/app/services/authen.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  AppURL = AppURL;
  AuthURL = AuthURL;
  Auth = false;
  constructor(
    private authen: AuthenService,
    private router: Router,
    private http: HttpService
  ) {
    this.authen.onGetData.subscribe(() => {
      this.checkLogin();
    })
  }

  ngOnInit() {
    this.checkLogin()
  }

  checkLogin() {
    if (this.authen.getAuthenticated()) {
      this.Auth = true
    }
  }

  onLogout() {
    this.authen.clearAuthenticated()
    this.router.navigate(['/', AppURL.Home]).then(() => {
      window.location.reload();
    })

  }

}
