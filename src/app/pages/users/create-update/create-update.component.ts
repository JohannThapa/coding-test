import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, finalize, first, Subject, takeUntil } from 'rxjs';
import { Location } from '@angular/common';
import { IUser, User } from 'src/app/common/interfaces/user';
import { UsersService } from 'src/app/common/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss']
})
export class CreateUpdateComponent {
  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  public title = 'Create User';
  public id: number;
  public form!: FormGroup;
  public loadingDetail: boolean = true;
  public saving: boolean = true;
  public userDetails: IUser = new User();
  constructor(
    private location: Location,
    private _userService: UsersService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.id = this.route.snapshot.params['id'];
  }
  createForm(item: any = {}) {
    this.form = this.formBuilder.group({
      firstName: [item.firstName ? item.firstName : '', [Validators.required, Validators.minLength(3)]],
      lastName: [item.lastName ? item.lastName : '', [Validators.required, Validators.minLength(3)]],
      email: [item.email ? item.email : '', [Validators.required, Validators.email]],
      age: [item.age ? item.age : 18, [Validators.required, Validators.min(18)]],
      id: [item.id ? item.id : 0]
    });
  }

  ngOnInit(): void {
    this.createForm()
    if (this.id) {
      this.title = 'Edit User';
      this._userService
        .getUserDetails(this.id)
        .pipe(
          debounceTime(60),
          finalize(() => (this.loadingDetail = false)),
          takeUntil(this._onDestroy$)
        )
        .subscribe((res) => {
          this.userDetails = new User(res);
          this.createForm(this.userDetails);
        });
    }
  }



  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
  onSubmit() {
    console.log(this.form)
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.saving = true;
    let item = this.form.value;
    if (!this.id) {
      this.create(item);
    } else {
      this.update(item);
    }
  }
  private create(item: IUser) {
    const nextHandler = () => {
      alert('New User Added.');
      this.cancelForm();
    };
    const errorHandler = (err: any) => {
      if (err instanceof HttpErrorResponse) {
        this.form.setErrors({
          server: `ERROR_API_${err.error.message}`,
        });
      } else {
        alert(err);
      }
    };
    this._userService
      .create(item)
      .pipe(first())
      .subscribe({
        next() {
          nextHandler.call(this);
        },
        error(err) {
          errorHandler.call(this, err);
        }
      })
      .add(() => (this.saving = false));
  }
  private update(item: IUser) {
    const nextHandler = () => {
      alert('User Updated.');
      this.cancelForm();
    };
    const errorHandler = (err: any) => {
      if (err instanceof HttpErrorResponse) {
        this.form.setErrors({
          server: `ERROR_API_${err.error.message}`,
        });
      } else {
        alert(err);
      }
    };
    this._userService
      .update(this.id, item)
      .pipe(first())
      .subscribe({
        next() {
          nextHandler.call(this);
        },
        error(err) {
          errorHandler.call(this, err);
        }
      })
      .add(() => (this.saving = false));
  }
  cancelForm() {
    this.form.reset()
    this.location.back()
  }
}
