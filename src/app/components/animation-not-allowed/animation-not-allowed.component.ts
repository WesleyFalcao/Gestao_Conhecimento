import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animation-not-allowed',
  templateUrl: './animation-not-allowed.component.html',
  styleUrls: ['./animation-not-allowed.component.scss']
})
export class AnimationNotAllowedComponent {

  options: AnimationOptions = {
    path: 'assets/animations/not-allowed.json',
  };

  constructor(
    private route: Router,
    ){
  }
  
  animationCreated(animationItem: AnimationItem): void {}

  Back_Home() {
    this.route.navigate(['/home'])
  }
}
