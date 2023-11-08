import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(
    private usersService: UserServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._getUsers();
  }

  ngOnDestroy() {

    this.endSubs$.complete();
  }

  private _getUsers(){
    this.usersService
    .getUsers()
    .pipe(takeUntil(this.endSubs$))
    .subscribe((categories) => {
      this.users = categories;
      console.warn(categories)
    });
  }
}
