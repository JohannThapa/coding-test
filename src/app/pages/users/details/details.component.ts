import { Component } from '@angular/core';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/common/interfaces/user';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/common/services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  public id: number;
  users$: Observable<User> = of();
  users: any[] = [];
  constructor(
    private location: Location,
    private _userService: UsersService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this._userService
      .getUsers()
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((res) => {
        let data: any[] = [];
        res.forEach((element: User) => {
          const items: any = {
            id: element.id,
            name: element.firstName + ' '+ element.lastName,
            email: element.email,
            tag: 'Age',
            value: element.age,
          };
          data.push(items);
        });
        this.users = data;
      });
    if (this.id) {
      this.users$ = this._userService
        .getUserDetails(this.id)
        .pipe(takeUntil(this._onDestroy$));
    }
  }
  ngOnDestroy() {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
  back():void{
    this.location.back()
  }
}
