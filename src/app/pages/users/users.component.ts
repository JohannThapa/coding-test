import { Component } from '@angular/core';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/common/interfaces/user';
import { UsersService } from 'src/app/common/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  private readonly _onDestroy$: Subject<void> = new Subject<void>();

  users$: Observable<User[]> = of([]);
  users: User[] = [];
  constructor(
    private _employeeService: UsersService,
  ) {}

  ngOnInit(): void {
    this._employeeService
      .getUsers()
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((res) => {
        this.users = res;
        console.log(this.users);
      });
  }
  ngOnDestroy() {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
  delete(item: User) {
    if(window.confirm('Are sure you want to delete this employee ?')){
      this._employeeService.delete(item.id).subscribe({
        next: (data) => {
          alert('Delete successful');
          this.ngOnInit();
        },
        error: (error) => {
          let errorMessage = error.message;
          alert(errorMessage);
          console.error('There was an error!', error);
        },
      });
     }

  }
}
