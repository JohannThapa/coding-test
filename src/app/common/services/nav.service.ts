import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  public lastValue: any;
  public newValue: any;
  public animationValue: any;

  constructor(
    private router: Router,
  ) {
    this.router
      .events
      .subscribe((event) => {
        if (event instanceof ActivationEnd) {
          const snapshot = event.snapshot;
          if (snapshot.data['num']) {
            this.lastValue = this.newValue;
            this.newValue = snapshot.data['num'];
            this.animationValue = this.getAnimationNumber(this.lastValue, this.newValue);
          }
        }
      });
  }

  getAnimationNumber(lastValue: number, newValue: number) {
    let result = 0;
    if (lastValue && newValue) {
      result = 2;
      if (lastValue) {
        if (newValue > lastValue) {
          result = 2;
        } else {
          result = 1;
        }
      } else {
        result = 1;
      }
    }
    return result;
  }
}
