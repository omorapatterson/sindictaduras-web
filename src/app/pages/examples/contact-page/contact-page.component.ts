import { Component, OnInit, OnDestroy } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-contact-page',
  templateUrl: 'contact-page.component.html'
})
export class ContactPageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  constructor() {}

  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
  }
}
