import {Injectable} from '@angular/core';

@Injectable()
export class TokenHelperService {
  private tokenPayload: object;

  constructor() {
    if (this.tokenIsSet()) {
      this.setTokenPayload();
    }
  }

  public tokenIsValid(): boolean {
    return this.tokenIsSet() && this.getSecondsUntilExpire() > 0;
  }

  public tokenIsSet(): boolean {
    return !!this.getToken();
  }

  public setToken(token: string) {
    localStorage.setItem('todo-Token', token);
    this.setTokenPayload();
  }

  public getToken(): string {
    return localStorage.getItem('todo-Token');
  }

  public delToken() {
    localStorage.removeItem('todo-Token');
    this.tokenPayload = null;
  }

  public getEmail(): string {
    return this.tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  }

  public getExpirationDate(): number {
    return this.tokenPayload['exp'];
  }

  public getSecondsUntilExpire(): number {
    return this.getExpirationDate() - Date.now();
  }

  public setTokenPayload() {
    const decodedPayload = this.getToken().split('.')[1];
    const payloadString = atob(decodedPayload);
    this.tokenPayload = JSON.parse(payloadString);
  }
}
