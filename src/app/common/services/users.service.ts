import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  rootUrl = `https://mockend.com/adamClements/coding-test/`;

  constructor(private http: HttpClient) {}
  getUsers(): Observable<any> {
    let relativeUrl: string = 'users';
    let url: string = this.rootUrl + relativeUrl;
    return this.http.get<any>(url);
  }
    getUserDetails(id: number): Observable<any> {
      let relativeUrl: string = 'users/' + id;
      let url: string = this.rootUrl + relativeUrl;
      return this.http.get<any>(url).pipe(map(res => {
        return res;
    }));
  }
  delete(id: number): Observable<any> {
    let relativeUrl: string = 'delete/' + id;
    let url: string = this.rootUrl + relativeUrl;
    return this.http.delete<any>(url);
  }
  create(data: User) {
    let relativeUrl: string = 'https://mockend.com/adamClements/coding-test';
    let url: string = relativeUrl;
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.append('Content-Type', 'application/json');
    header.append('Accept', 'application/json');
    header.append('Access-Control-Allow-Origin', '*');
    header.append('Origin','http://localhost:4200');
    return this.http.post(url, data, { headers: header });
  }

  update(id: number, data: User) {
    let relativeUrl: string = 'https://mockend.com/adamClements/coding-test/' + id;
    let url: string = relativeUrl;
    return this.http.post(url, data);
  }

}
