import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from '../../authentication.url';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { AccountService } from 'src/app/shareds/services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/shareds/services/movie.service';

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
  movieId: string;
  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private account: AccountService,
    private router: Router,
    private activatedrouter: ActivatedRoute,
    private movie: MovieService
  ) {
    this.activatedrouter.params.forEach(param => {
      this.movieId = param.id
    })
    this.initialCreateFormData();
    this.intitialUpdateFormData();

  }

  ngOnInit() {
  }
  AppURL = AppURL;
  AuthURL = AuthURL;
  Form: FormGroup;
  isDisabled = true;
  showLoading: boolean;
  movieData: any;

  onSubmit() {
    this.showLoading = true;
    //เพิ่มหนังสือ
    if (!this.movieId) {
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
    } else {//แก้ไขหนังสือ
      Promise.all([this.uploadImage(this.movieData.idImageUpload), this.uploadVideo(this.movieData.idVideoUpload)]).then(() => {
        this.account.onAddMovie(this.Form.value, this.movieId).then(() => {
          this.showLoading = false;
          this.alert.notify('แก้ไขหนังสำเร็จ')
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


  }
  uploadImage(movieid?) {
    return new Promise((resolve, reject) => {
      if (!this.Form.value.image) resolve('อัพเดรท')
      try {
        const formData: any = new FormData();
        console.log(this.Form.value.image);
        for (let i = 0; i < 1; i++) {
          console.log(this.Form.value.image[i]);
          formData.append('uploads[]', this.Form.value.image[i], this.Form.value.image[i]['name']);
        }
        this.account.onUpload(formData, movieid).then(result => {
          resolve(this.Form.value.idImageUpload = result.data.id)
        }).catch(e => {
          reject(e.error)
        })
      } catch {
        throw 'อัพโหลดไม่สำเร็จ';
      }
    })
  }

  uploadVideo(movieid?) {
    return new Promise((resolve, reject) => {
      if (!this.Form.value.video) resolve('อัพเดรท')

      try {
        const formData1: any = new FormData();
        for (let i = 0; i < 1; i++) {
          console.log(this.Form.value.video[i]);
          formData1.append('uploads[]', this.Form.value.video[i], this.Form.value.video[i]['name']);
        }
        this.account.onUpload(formData1, movieid).then(result => {
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
    if (this.movieId) {
      this.isDisabled = false
    } else {
      if (this.Form.value.image.length !== 0 && this.Form.value.video.length !== 0) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true
      }
    }

  }

  changeVideo(event) {
    this.Form.value.video = event.target.files;
    if (this.movieId) {
      this.isDisabled = false
    } else {
      if (this.Form.value.image.length !== 0 && this.Form.value.video.length !== 0) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true
      }
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

  onCancel() {
    console.log('ยกเลิก')
    return this.router.navigate(['', AppURL.Home])
  }

  private intitialUpdateFormData() {
    if (!this.movieId) return;
    this.movie.onLoadMovies(this.movieId)
      .then(movie => {
        console.log(movie)
        this.movieData = movie;
        this.isDisabled = false;
        this.Form.controls['nameMovie'].setValue(movie.nameMovie);
        this.Form.controls['linkPreview'].setValue(movie.linkPreview);
        this.Form.controls['soundTrack'].setValue(movie.soundTrack);
        this.Form.controls['resolution'].setValue(movie.resolution);
        this.Form.controls['group'].setValue(movie.group);
        this.Form.controls['type'].setValue(movie.type);
        this.Form.controls['summary'].setValue(movie.summary);
        this.Form.controls['rating'].setValue(movie.rating);
      })
      .catch(e => {
        this.alert.someting_wrong('เกิดข้อผิดพลาด')
        this.router.navigate(['', AppURL.Home])
      })
  }
}
