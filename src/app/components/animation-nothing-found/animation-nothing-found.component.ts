import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'animation-nothing-found',
  templateUrl: './animation-nothing-found.component.html',
  styleUrls: ['./animation-nothing-found.component.scss']
})
export class AnimationNothingFoundComponent {

  options: AnimationOptions = {
    path: 'assets/animations/nothing-fund-lupa.json',
  };

  animationCreated(animationItem: AnimationItem): void {}
}
