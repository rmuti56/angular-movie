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

  //เกี่ยวกับการอัพโหลดไฟล์
  onUpload(model: any, movieid?) {
    if (movieid) {
      return this.http
        .requestPost(`api/movie/upload?id=${movieid}`, model)
        .toPromise() as Promise<any>
    } else {
      return this.http
        .requestPost('api/movie/upload', model)
        .toPromise() as Promise<any>
    }
  }

  //เพิ่มและแก้ไขหนัง
  onAddMovie(model: any, movieid?) {
    if (movieid) {
      return this.http
        .requestPost(`api/movie/addmovie?id=${movieid}`, model)
        .toPromise() as Promise<any>
    } else {
      return this.http
        .requestPost('api/movie/addmovie', model)
        .toPromise() as Promise<any>
    }
  }

  //ลบหนัง
  onDeleteMovei(id, idImage, idVideo) {
    return this.http.requestDelete(`api/movie/deletemovie?id=${id}&idImage=${idImage}&idVideo=${idVideo}`)
      .toPromise() as Promise<any>
  }

}
