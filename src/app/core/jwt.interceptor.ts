import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {getToken} from '../utils/TokenHelper';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = getToken();

    if (token) {
      req = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }

    return next.handle(req);
  }
}
