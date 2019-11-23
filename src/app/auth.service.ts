import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Login } from './shared/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private baseUrl="http://localhost:62800/api";
  public login(userInfo: Login): Observable<any> {
    localStorage.setItem('ACCESS_TOKEN', "acess_token")
    return this.http.get(this.baseUrl +'/Logins');
  }
  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  public isLoggedOut() {
    return localStorage.removeItem('ACCESS_TOKEN');
  }
}
