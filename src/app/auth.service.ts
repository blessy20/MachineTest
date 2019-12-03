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
   
    return this.http.get(this.baseUrl +'/Logins?username='+userInfo.username+'&password='+userInfo.password);
  }
  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  public isLoggedOut() {
    return localStorage.removeItem('ACCESS_TOKEN');
  }
}
