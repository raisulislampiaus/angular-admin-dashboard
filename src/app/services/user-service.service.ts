import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  url = 'https://angular-dashboard-8x4r.onrender.com/api/v1/users';

  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${userId}`);
  }
  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.url}/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }
}
