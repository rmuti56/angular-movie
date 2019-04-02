import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from '../../authentication.url';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { AccountService } from 'src/app/shareds/services/account.service';
import { Router } from '@angular/router';

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
    "สืบสวนสอบสวน",
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
    private account: AccountService,
    private router: Router
  ) {
    this.initialCreateFormData();
  }

  ngOnInit() {
  }
  AppURL = AppURL;
  AuthURL = AuthURL;
  Form: FormGroup;
  isDisabled = true;
  showLoading: boolean;

  onSubmit() {
    // if (this.Form.invalid) {
    //   return this.alert.someting_wrong();
    // }
    this.showLoading = true;

    Promise.all([this.uploadImage(), this.uploadVideo()]).then(() => {
      this.account.onAddMovie(this.Form.value).then(() => {
        this.showLoading = false;
        this.alert.notify('เพิ่มหนังสำเร็จ')
        this.router.navigate(['/', AppURL.Home])
      }).catch(err => {
        this.showLoading = false;
        this.alert.someting_wrong(err.error)
      })
    }).catch(e => {
      this.showLoading = false;
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
          resolve(this.Form.value.idImageUpload = result.data.id)
        }).catch(e => {
          reject(e.error)
        })
      } catch {
        throw 'อัพโหลดไม่สำเร็จ';
      }
    })
  }

  uploadVideo() {
    return new Promise((resolve, reject) => {
      try {
        const formData1: any = new FormData();
        for (let i = 0; i < 1; i++) {
          console.log(this.Form.value.video[i]);
          formData1.append('uploads[]', this.Form.value.video[i], this.Form.value.video[i]['name']);
        }
        this.account.onUpload(formData1).then(result => {
          resolve(this.Form.value.idVideoUpload = result.data.id)
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
    if (this.Form.value.image.length !== 0 && this.Form.value.video.length !== 0) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true
    }
  }

  changeVideo(event) {
    this.Form.value.video = event.target.files;
    if (this.Form.value.image.length !== 0 && this.Form.value.video.length !== 0) {
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
      video: ['',],
      idImageUpload: [''],
      idVideoUpload: [''],
      rating: ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(10)])]
    })
  }
}
