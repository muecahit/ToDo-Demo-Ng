import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {decodeToken, getSecondsUntilExpire, removeToken, setToken, tokenIsValid, getToken, getEmail} from '../utils/TokenHelper';

@Injectable()
export class UserService {
  public email: string;
  public loginFailed = false;

  constructor(private http: HttpClient, private router: Router) {
    this.tryLoginOnAppStart();
  }

  register(email: string, password: string) {
    this.http.post('user/register', {email, password}, {responseType: 'text'})
      .subscribe(token => {
        setToken(token);
        this.login(token);
      });
  }

  loginRequest(email: string, password: string) {
    this.http.post('user/login', {email, password}, {responseType: 'text'})
      .subscribe(token => {
        this.loginFailed = false;
        setToken(token);
        this.login(token);
      }, error => {
        this.loginFailed = true;
        this.navigate('/login');
      });
  }

  login(token: string) {
    const decodedTokenObj = decodeToken(token);

    if (tokenIsValid(decodedTokenObj)) {
      this.startTimeoutForToken(decodedTokenObj);
      this.email = getEmail(decodedTokenObj);
    } else {
      removeToken();
    }
    this.navigate('/todolists');
  }

  logOut() {
    removeToken();
    this.navigate('/');
    location.reload(true);
  }

  private requestNewToken() {
    this.http.post('user/newToken', {email: this.email}, {responseType: 'text'})
      .subscribe(token => {
        setToken(token);
        this.startTimeoutForToken(decodeToken(token));
      });
  }

  isAuthenticated(): boolean {
    return !!this.email;
  }

  private navigate(to: string) {
    this.router.navigate([to]);
  }

  private startTimeoutForToken(token: object) {
    setTimeout(() => this.requestNewToken(), getSecondsUntilExpire(token));
  }

  private tryLoginOnAppStart() {
    const token = getToken();

    if (token) {
      this.login(token);
    }
  }
}
