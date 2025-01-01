import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  registerNewUser(
    name: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post(environment.API_URL_REGISTER, {
      name,
      email,
      password,
    });
  }

  logInUser(email: string, password: string): Observable<any> {
    return this.http.post(environment.API_URL_LOGIN, {
      email,
      password,
    });
  }

  userLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  get isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  // get isAdmin(){
  //   let userData = localStorage.getItem("user")
  //   if (userData) {
  //     return JSON.parse(userData).user.isAdmin
  //   }
  //     return false
  // }

  get userName() {
    let userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).user.name;
    }
    return null;
  }

  get userEmail() {
    let userEmail = localStorage.getItem('user');
    if (userEmail) {
      return JSON.parse(userEmail).user.email;
    }
    return null;
  }
}
