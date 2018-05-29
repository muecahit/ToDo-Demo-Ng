import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnDestroy {
  @Input() displayInline = false;

  constructor(public us: UserService, private router: Router) {
  }

  logIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.us.loginRequest(email, password);
  }

  notInLoginRoute(): boolean {
    return !this.router.url.includes('/login');
  }

  ngOnDestroy(): void {
    this.us.loginFailed = false;
  }
}
