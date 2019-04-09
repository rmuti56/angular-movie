import { Component, OnInit, ElementRef } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/shareds/services/movie.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-playmovie',
  templateUrl: './playmovie.component.html',
  styleUrls: ['./playmovie.component.css']
})
export class PlaymovieComponent implements OnInit {

  AppURL = AppURL
  movieId: any;
  loadMovie: any = {};
  movieUrl;
  videoId: string = '';
  otherVar: string = '';
  urlCache = new Map<string, SafeResourceUrl>();
  imageDefaultId = '1Y1aUQelHZVPjGfVTnxorhEpJiB66jC5T'
  returnURL: any;
  constructor(
    private activatedRouter: ActivatedRoute,
    private movie: MovieService,
    private alert: AlertService,
    private domSanitizer: DomSanitizer,
    private hostElement: ElementRef,

  ) {
    this.activatedRouter.params.forEach(param => {
      this.movieId = param.id
    })
    this.initialLoadMovie();
  }

  ngOnInit() {

  }

  getIframeYoutubeUrl(youtubeLink: string): SafeResourceUrl {
    let embledLink
    let url = this.urlCache.get(youtubeLink);
    if (youtubeLink) {
      if (youtubeLink.split('/')[1] !== 'embed' && youtubeLink.split('/')[3].split('?')[0] === 'watch') {
        embledLink = `https://www.youtube.com/embed/${youtubeLink.split('/')[3].split('?')[1].split('=')[1]}`
      } else {
        embledLink = youtubeLink
      }
      url = this.domSanitizer.bypassSecurityTrustResourceUrl(
        `${embledLink}`);
      this.urlCache.set(embledLink, url);
      return url;
    } else {
      return this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/https://www.youtube.com/embed/f3m5Jbqs11E`);
    }
  }

  getEmbedUrl(url) {
    if (url) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl(`https://drive.google.com/file/d/${url}/preview`);
    } else {
      return this.domSanitizer.bypassSecurityTrustResourceUrl(`https://drive.google.com/file/d/1ObPQVTY8G-NaQtHHcogTkwQ_vKz19YbG/preview`);
    }
  }
  initialLoadMovie() {
    this.movie.onLoadMovies(this.movieId).then((result) => {
      this.loadMovie = result;
      this.returnURL = `http://localhost:4200/playmovie/${result._id}`

    }).catch(e => {
      return this.alert.someting_wrong('เกิดข้อผิดพลาด')
    })
  }
}
