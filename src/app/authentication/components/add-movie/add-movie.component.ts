import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from '../../authentication.url';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { AccountService } from 'src/app/shareds/services/account.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  typeMovie = [
    "บู้",
    "ผจญภัย",
    "การ์ตูน",
    "ชีวิตจริง",
    "ตลก",
    "อาชญากรรม",
    "ครอบครัว",
    "เทพนิยาย",
    "ประวัติศาสตร์",
    "สยองขวัญ",
    "สืบสอนสอบสวน",
    "สงคราม",
    "โรแมนติก",
    "กีฬา",
    "โป้",
  ]

  groupMovie = [
    "มาแรง",
    "หนังเอเชีย",
    "หนังฝรั่ง",
    "ยอดนิยม"
  ]
  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private account: AccountService
  ) {
    this.initialCreateFormData();
  }

  ngOnInit() {
  }
  AppURL = AppURL;
  AuthURL = AuthURL;
  Form: FormGroup;
  isDisabled = true;

  onSubmit() {
    // if (this.Form.invalid) {
    //   return this.alert.someting_wrong();
    // }


    Promise.all([this.uploadImage(), this.uploadVedio()]).then(() => {
      this.alert.notify('อัพโหลด');
    }).catch(e => {
      this.alert.someting_wrong(e);
    })

  }
  uploadImage() {
    return new Promise((resolve, reject) => {
      try {
        const formData: any = new FormData();
        console.log(this.Form.value.image);
        for (let i = 0; i < 1; i++) {
          console.log(this.Form.value.image[i]);
          formData.append('uploads[]', this.Form.value.image[i], this.Form.value.image[i]['name']);
        }
        this.account.onUpload(formData).then(result => {
          resolve(this.Form.value.idImageUpload = result.data)
        }).catch(e => {
          reject(e.error)
        })
      } catch {
        throw 'อัพโหลดไม่สำเร็จ';
      }
    })
  }

  uploadVedio() {
    return new Promise((resolve, reject) => {
      try {
        const formData1: any = new FormData();
        for (let i = 0; i < 1; i++) {
          console.log(this.Form.value.vedio[i]);
          formData1.append('uploads[]', this.Form.value.vedio[i], this.Form.value.vedio[i]['name']);
        }
        this.account.onUpload(formData1).then(result => {
          resolve(this.Form.value.idVedioUpload = result.data)
        }).catch(e => {
          reject(e.error)
        })
      } catch {
        throw 'อัพโหลดไม่สำเร็จ';
      }

    })
  }

  changeImage(event) {
    this.Form.value.image = event.target.files;
    if (this.Form.value.image.length !== 0 && this.Form.value.vedio.length !== 0) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true
    }
  }

  changeVedio(event) {
    this.Form.value.vedio = event.target.files;
    if (this.Form.value.image.length !== 0 && this.Form.value.vedio.length !== 0) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true
    }
  }

  private initialCreateFormData() {
    this.Form = this.builder.group({
      nameMovie: ['', Validators.required],
      linkPreview: ['', Validators.required],
      soundTrack: ['', Validators.required],
      resolution: ['', Validators.required],
      group: ['มาแรง', Validators.required],
      type: ['บู้', Validators.required],
      summary: ['', Validators.required],
      image: ['',],
      vedio: ['',],
      idImageUpload: [''],
      idVedioUpload: [''],
    })
  }
}
