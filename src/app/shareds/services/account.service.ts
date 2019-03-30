import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpService
  ) { }

  //เข้าสู่ระบบ
  onLogin(model: any) {
    return this.http
      .requestPost('api/movie/login', model)
      .toPromise() as Promise<any>
  }

}
