import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  private accessKey = 'ssKey';
  onGetData: EventEmitter<any> = new EventEmitter();

  //กำหนดค่า access token ไว้ในความจำ browser
  setAuthenticated(accessToken: any) {

    localStorage.setItem(this.accessKey, accessToken);
    this.onGetData.emit(true);
  }

  //ดึงค่า access token ในความจำ browser ออกมา
  getAuthenticated(): string {
    return localStorage.getItem(this.accessKey)
  }

  //ล้างค่า access token ในความจำ browser
  clearAuthenticated(): void {
    localStorage.removeItem(this.accessKey);
  }
}
