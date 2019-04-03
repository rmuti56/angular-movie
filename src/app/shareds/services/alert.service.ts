import { Injectable } from '@angular/core';
declare let Lobibox;
declare let Swal;
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



  confirm(message: string = 'คุณต้องการทำรายการต่อไปหรือไม่'): Promise<any> {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    return swalWithBootstrapButtons.fire({
      title: 'คำยืนยัน',
      text: message,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยน!',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'ทำรายการ.',
          'success'
        )
        return true
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'การทำรายการถูกยกเลิก',
          'error'
        )
      }
    })
  }
}
