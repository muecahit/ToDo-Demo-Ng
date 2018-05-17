import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TokenHelperService} from './token-helper.service';

@Injectable()
export class UserService {
  public email: string;

  constructor(private http: HttpClient, private router: Router, private tokenHelper: TokenHelperService) {
    if (!this.tokenHelper.tokenIsValid()) {
      this.tokenHelper.delToken();
    }

    if (this.isAuthenticated()) {
      this.email = this.tokenHelper.getEmail();
      this.startTimeoutForToken();
    }
  }

  register(email: string, password: string) {
    this.http.post('user/register', {email, password}, {responseType: 'text'})
      .subscribe(token => {
        this.tokenHelper.setToken(token);
        this.startTimeoutForToken();
        this.email = email;
        // this.navigate('/todolists');
      });
  }

  login(email: string, password: string) {
    this.http.post('user/login', {email, password}, {responseType: 'text'})
      .subscribe(token => {
        this.tokenHelper.setToken(token);
        this.startTimeoutForToken();
        this.email = email;
        // this.navigate('/todolists');
      });
  }

  logOut() {
    this.tokenHelper.delToken();
    // this.navigate('/todolists');
    location.reload(true);
  }

  requestNewToken() {
    this.http.post('user/newToken', {email: this.email}, {responseType: 'text'})
      .subscribe(token => {
        this.tokenHelper.setToken(token);
        this.startTimeoutForToken();
      });
  }

  isAuthenticated(): boolean {
    return this.tokenHelper.tokenIsSet();
  }

  private navigate(to: string) {
    this.router.navigate([to]);
  }

  private startTimeoutForToken() {
    setTimeout(() => this.requestNewToken(), this.tokenHelper.getSecondsUntilExpire());
  }
}
