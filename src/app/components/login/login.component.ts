import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenService } from 'src/app/services/authen.service';
import { AppURL } from 'src/app/app.url';
import { AccountService } from 'src/app/shareds/services/account.service';
declare let Lobibox;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private alert: AlertService,
    private builder: FormBuilder,
    private router: Router,
    private authen: AuthenService,
    private account: AccountService,
    private activatedRoute: ActivatedRoute
  ) {
    this.initialCreateFormData();
    this.activatedRoute.params.forEach(param => {
      this.returnURL = param.returnURL || `/${AppURL.Home}`
    })
  }

  ngOnInit() {
  }
  returnURL: string;
  AppURL = AppURL
  form: FormGroup
  showLoadingIndicator: boolean;

  onSubmit() {
    if (this.form.invalid) {
      return this.alert.someting_wrong();
    }
    this.showLoadingIndicator = true;
    this.account.onLogin(this.form.value)
      .then(res => {
        console.log(res)
        //เก็บ session
        this.authen.setAuthenticated(res);
        this.showLoadingIndicator = false;
        this.alert.notify('เข้าสู่ระบบสำเร็จ');
        this.router.navigateByUrl(this.returnURL);
      })
      .catch(err => {
        this.alert.someting_wrong(err.error)
        this.showLoadingIndicator = false
      })

  }

  private initialCreateFormData() {
    this.form = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

}
