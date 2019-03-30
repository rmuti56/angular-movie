import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  AppURL = AppURL
}
