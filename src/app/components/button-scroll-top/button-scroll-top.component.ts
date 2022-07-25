import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-button-scroll-top',
  templateUrl: './button-scroll-top.component.html',
  styleUrls: ['./button-scroll-top.component.scss']
})
export class ButtonScrollTopComponent implements OnInit {

  constructor() { }

  @ViewChild('button', { static: false }) button: ElementRef

  verticalOffset: number

  ngOnInit(): void {
  }

  Scroll_Top() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }
}
