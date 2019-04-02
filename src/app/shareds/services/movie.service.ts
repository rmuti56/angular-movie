import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpService
  ) { }

  //โหลดข้อมูลหนัง
  onLoadMovies(id?) {
    if (id) {
      return this.http
        .requestGet(`api/movie/loadmovies?id=${id}`)
        .toPromise() as Promise<any>
    } else {
      return this.http
        .requestGet(`api/movie/loadmovies`)
        .toPromise() as Promise<any>
    }
  }

  //ค้นหาหนังตามกลุ่ม
  onSearchMovie(item) {
    return this.http
      .requestGet(`api/movie/searchmovie?item=${item}`)
      .toPromise() as Promise<any>
  }

  //ค้นหาหนังตามประเภท
  onSearchTypeMovie(item) {
    return this.http
      .requestGet(`api/movie/searchtypemovie?item=${item}`)
      .toPromise() as Promise<any>
  }

}
