import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input() displayInline = false;

  constructor(private us: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  logIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.us.login(email, password);
  }

  notInLoginRoute() {
    return this.router.url !== '/login';
  }
}
