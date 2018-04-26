import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class UserService {
  public email = '';

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {
  }

  register(email: string, password: string) {
    console.log({email, password});
    this.http.post('user/register', {email, password}, {responseType: 'text'})
      .subscribe(token => {
        this.setToken(token);
        this.email = email;
        this.simpleNavigation('/todolists');
      });
  }

  login(email: string, password: string) {
    this.http.post('user/login', {email, password}, {responseType: 'text'})
      .subscribe(token => {
        this.setToken(token);
        this.email = email;
        this.simpleNavigation('/todolists');
      });
  }

  logOut() {
    this.delToken();
    this.simpleNavigation('/todolists');
    location.reload(true);
  }

  isAuthenticated() {
    return this.email !== '';
  }

  private setToken(token: string) {
    localStorage.setItem('todo-Token', token);
  }

  private getToken() {
    return localStorage.getItem('todo-Token');
  }

  private delToken() {
    localStorage.removeItem('todo-Token');
  }

  private simpleNavigation(to: string) {
    this.router.navigate([to]);
  }
}
