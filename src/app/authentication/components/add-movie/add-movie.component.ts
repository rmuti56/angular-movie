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

  onSubmit() {
    // if (this.Form.invalid) {
    //   return this.alert.someting_wrong();
    // }
    console.log(this.Form.value)
    this.alert.notify('ทดสอบ')
    this.uploadImage();
  }
  uploadImage() {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      for (let i = 0; i < 1; i++) {
        formData.append('uploads[]', this.Form.value.image[i], this.Form.value.image[i]['name']);
      }
      this.account.onUpload(formData).then(result => {
        console.log(result.data);
      }).catch(e => {
        console.log(e);
      })
    })
  }

  changeImage(event) {
    this.Form.value.image = event.target.files;
    console.log(this.Form.value.image);
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
      image: ['', Validators.required],
      vedio: ['', Validators.required],
    })
  }
}
