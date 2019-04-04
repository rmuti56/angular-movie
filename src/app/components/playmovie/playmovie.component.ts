import { Component, OnInit, ElementRef } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/shareds/services/movie.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-playmovie',
  templateUrl: './playmovie.component.html',
  styleUrls: ['./playmovie.component.css']
})
export class PlaymovieComponent implements OnInit {
  AppURL = AppURL
  movieId: any;
  loadMovie = '';
  movieUrl;
  videoId: string = '';
  otherVar: string = '';
  urlCache = new Map<string, SafeResourceUrl>();
  movieDefaultId = '1eM0_TKy6FkCuR2wxngWr39TD3FEneDT_';
  imageDefaultId = '1KBNb3Kx_dJLqZAaD14nurw4kR29_BFFf'
  youtubeLink = "https://www.youtube.com/embed/fdZqDyBRtmo"
  returnURL
  constructor(
    private activatedRouter: ActivatedRoute,
    private movie: MovieService,
    private alert: AlertService,
    private domSanitizer: DomSanitizer,
    private hostElement: ElementRef
  ) {
    this.activatedRouter.params.forEach(param => {
      this.movieId = param.id
    })
    this.initialLoadMovie();
  }

  ngOnInit() {

  }

  getCommentUrl(): SafeResourceUrl {
    let url = this.urlCache.get(this.movieId);
    if (!url) {
      url = this.domSanitizer.bypassSecurityTrustResourceUrl(
        `http://localhost:4200/playmovie/${this.movieId}`);;
      this.urlCache.set(this.movieId, url);
    }
    console.log(url)
    return url;
  }

  getIframeVideoUrl(videoId: string): SafeResourceUrl {
    let url = this.urlCache.get(videoId);
    if (!url && videoId) {
      url = this.domSanitizer.bypassSecurityTrustResourceUrl(
        `https://drive.google.com/file/d/${videoId}/preview`);;
      this.urlCache.set(videoId, url);
    }
    return url;
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
    }).catch(e => {
      return this.alert.someting_wrong('เกิดข้อผิดพลาด')
    })
  }
}
