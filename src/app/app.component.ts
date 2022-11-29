import { Component } from '@angular/core';
import { NavService } from './common/services/nav.service';
import { routerTransition } from './common/utils/router-transition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routerTransition(),
  ]
})
export class AppComponent {
  title = 'coding-test';
  constructor(
    private navigationService: NavService
  ) {
  }
  getRouteAnimation(outlet: any) {
    return this.navigationService.animationValue;
  }
}
