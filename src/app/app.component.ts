import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppAnimations } from './app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [AppAnimations]
})
export class AppComponent {
  title = 'gestao-conhecimento-1';

  prepareRoute(
    outlet: RouterOutlet
  ) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }
}
