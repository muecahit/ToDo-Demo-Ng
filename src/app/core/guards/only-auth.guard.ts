import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../user.service';

@Injectable()
export class OnlyAuthGuard implements CanActivate {
  constructor(private us: UserService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const authenticated = this.us.isAuthenticated();

    if (!authenticated) {
      this.router.navigate(['/login']);
    }

    return authenticated;
  }
}
