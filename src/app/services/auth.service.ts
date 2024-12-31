import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL_REGISTER = 'http://localhost:8002/auth/register/';
  API_URL_LOGIN = 'http://localhost:8002/auth/login/';

  http = inject(HttpClient);

  registerNewUser(
    name: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post(this.API_URL_REGISTER, {
      name,
      email,
      password,
    });
  }

  logInUser(email: string, password: string): Observable<any> {
    return this.http.post(this.API_URL_LOGIN, {
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
