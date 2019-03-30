import { Injectable } from '@angular/core';
declare let Lobibox;
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  notify(message: string, type: string = 'success') {
    Lobibox.notify(type, {
      showClass: 'rollIn',
      hideClass: 'rollOut',
      msg: message
    });
  }

  someting_wrong(message: string = 'ข้อมูลบางอย่างไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง', type: string = "error") {
    this.notify(message, type);
  }
}
